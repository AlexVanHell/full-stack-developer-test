import {
	CanActivate,
	ExecutionContext,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ApiException } from '../../../../common/api-exception/api-exception';
import { AuthOptions } from '../../interface/auth-options.interface';
import { AuthRequest } from '../../interface/auth-request.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
	constructor(private readonly reflector: Reflector) {
		super();
	}

	public canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp();
		const request = ctx.getRequest<AuthRequest>();
		const classOptions = this.reflector.get<AuthOptions>(
			'options',
			context.getClass(),
		);
		const handlerOptions = this.reflector.get<AuthOptions>(
			'options',
			context.getHandler(),
		);
		const options = { ...classOptions, ...handlerOptions };
		const token = request.get('Authorization');

		if (options.required || token) {
			return super.canActivate(context);
		}

		return true;
	}

	public handleRequest(err: any, user: any, info: any) {
		if (err instanceof UnauthorizedException) {
			throw new ApiException(HttpStatus.UNAUTHORIZED, 'TOKEN_INVALID');
		} else if (err) {
			throw err;
		}

		if (info instanceof Error) {
			if (info.message === 'No auth token') {
				throw new ApiException(HttpStatus.UNAUTHORIZED, 'TOKEN_NOT_PROVIDED');
			}

			throw info;
		}

		return user;
	}
}
