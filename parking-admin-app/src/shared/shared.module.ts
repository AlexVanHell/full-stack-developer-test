import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from '../common/api-exception/exception-filter/api-exception.filter';
import { AllExceptionFilter } from '../common/exception-filter/all-exception.filter';
import { ConfigModule } from '../config/config.module';

@Module({
	imports: [ConfigModule],
	exports: [ConfigModule],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: ApiExceptionFilter,
		},
	],
})
export class SharedModule {}
