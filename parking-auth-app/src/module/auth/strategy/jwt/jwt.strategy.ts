import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Algorithm, SignOptions } from 'jsonwebtoken';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { ConfigJwtOptionsInterface } from '../../../../config/interface/config-jwt-options.interface';
import { UserDto } from '../../../user/dto/user.dto';
import { AuthRequest } from '../../interface/auth-request.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(@Inject('authJwtOptions') jwtOptions: ConfigJwtOptionsInterface) {
		const extras: {
			issuer?: SignOptions['issuer'];
			audience?: SignOptions['audience'];
			algorithm?: Algorithm;
		} = {};

		const keys: (keyof ConfigJwtOptionsInterface)[] = [
			'issuer',
			'audience',
			'algorithm',
		];

		for (const key of keys) {
			if (typeof jwtOptions[key] !== 'undefined') {
				extras[key] = jwtOptions[key];
			}
		}

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtOptions.secret,
			...extras,
			ignoreExpiration: false,
			jsonWebTokenOptions: {
				...extras,
				ignoreExpiration: false,
			},
			passReqToCallback: true,
		} as StrategyOptions);
	}

	public async validate(request: AuthRequest, payload: UserDto) {
		return {
			username: payload.username,
			email: payload.email,
			firstname: payload.firstname,
			lastname: payload.lastname,
			role: payload.role,
		};
	}
}
