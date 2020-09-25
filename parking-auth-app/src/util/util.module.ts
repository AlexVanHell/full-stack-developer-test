import { Module } from '@nestjs/common';
import { DateUtilService } from './date/date-util.service';
import { PasswordUtilService } from './password/password.util.service';

@Module({
	providers: [PasswordUtilService, DateUtilService],
	exports: [PasswordUtilService, DateUtilService],
})
export class UtilModule {}
