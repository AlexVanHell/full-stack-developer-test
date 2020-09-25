import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Algorithm, SignOptions } from 'jsonwebtoken';
import { ExtractKeysOfValueType } from '../../../common/type/extract-keys-of-value.type';
import { ConfigModule } from '../../../config/config.module';
import { ConfigJwtOptionsInterface } from '../../../config/interface/config-jwt-options.interface';
import { ConfigInterface } from '../../../config/interface/config.interface';
import { ConfigService } from '../../../config/service/config.service';

@Module({
	imports: [ConfigModule],
})
export class JwtCustomModule {
	public static forRoot(
		name: ExtractKeysOfValueType<ConfigInterface, ConfigJwtOptionsInterface>,
	): DynamicModule {
		// For more information visit: https://github.com/nestjs/jwt
		const jwtModule = JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				const jwtOptions = configService.get(name);
				const extras: {
					issuer?: SignOptions['issuer'];
					audience?: SignOptions['audience'];
					algorithm?: Algorithm;
				} = {};

				for (const key in ['issuer', 'audience', 'algorithm']) {
					if (typeof jwtOptions[key] !== 'undefined') {
						extras[key] = jwtOptions[key];
					}
				}

				return {
					secret: jwtOptions.secret,
					verifyOptions: {
						...extras,
						ignoreExpiration: false,
					},
					signOptions: {
						...extras,
						expiresIn: jwtOptions.expiresIn,
						encoding: 'utf-8',
					},
				};
			},
			inject: [ConfigService],
		});

		return {
			module: JwtCustomModule,
			imports: [jwtModule],
			providers: [
				{
					provide: `${name}JwtOptions`,
					useFactory: (configService: ConfigService) => configService.get(name),
					inject: [ConfigService],
				},
			],
			exports: [`${name}JwtOptions`, jwtModule],
		};
	}
}
