import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from '../common/api-exception/exception-filter/api-exception.filter';
import { AllExceptionFilter } from '../common/exception-filter/all-exception.filter';
import { ConfigModule } from '../config/config.module';
import { JwtExceptionFilter } from '../module/auth/exception-filter/jwt-exception.filter';
import { UtilModule } from '../util/util.module';

@Module({
	imports: [ConfigModule, UtilModule],
	exports: [ConfigModule, UtilModule],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: ApiExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: JwtExceptionFilter,
		},
	],
})
export class SharedModule {}
