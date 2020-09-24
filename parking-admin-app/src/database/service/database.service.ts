import { Injectable } from '@nestjs/common';
import {
	MongooseModuleOptions,
	MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from '../../config/service/config.service';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	public createMongooseOptions(): MongooseModuleOptions {
    const config = this.configService.get('db');

    if (!config.host || !config.port) {
      throw new Error('Host and Port are required to establish database connection');
    }

		return {
			uri: `mongodb://${config.host}:${config.port}/${
				config.database
			}`,
			auth: {
				user: config.username,
				password: config.password,
			},
		};
	}
}
