import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { DatabaseService } from './service/database.service';

@Module({
	providers: [DatabaseService],
	imports: [
		ConfigModule,
		MongooseModule.forRootAsync({
			useClass: DatabaseService,
			imports: [ConfigModule],
		}),
	],
	exports: [],
})
export class DatabaseModule {}
