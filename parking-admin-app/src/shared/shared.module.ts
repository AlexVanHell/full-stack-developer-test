import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from '../common/api-exception/exception-filter/api-exception.filter';
import { AllExceptionFilter } from '../common/exception-filter/all-exception.filter';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';

@Module({
	imports: [ConfigModule, DatabaseModule],
	exports: [ConfigModule, DatabaseModule],
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
