import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { AuthService } from './service/auth.service';

@Module({
	providers: [AuthService],
	imports: [ConfigModule],
	exports: [AuthService],
})
export class AuthModule {}
