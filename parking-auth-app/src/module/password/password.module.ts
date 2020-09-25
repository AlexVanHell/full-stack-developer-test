import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { PasswordController } from './controller/password.controller';
import { PasswordService } from './service/password.service';

@Module({
	providers: [PasswordService],
	controllers: [PasswordController],
	imports: [SharedModule],
})
export class PasswordModule {}
