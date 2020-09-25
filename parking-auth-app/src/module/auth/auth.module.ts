import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../../shared/shared.module';
import { AuthController } from './controller/auth.controller';
import { JwtCustomModule } from './jwt/jwt-custom.module';
import { AuthService } from './service/auth.service';
import { BasicStrategy } from './strategy/basic/basic.strategy';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';

@Module({
	imports: [
		SharedModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
		JwtCustomModule.forRoot('auth'),
	],
	controllers: [AuthController],
	providers: [AuthService, BasicStrategy, JwtStrategy],
})
export class AuthModule {}
