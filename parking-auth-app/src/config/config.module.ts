import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from './service/config.service';

@Module({
	providers: [ConfigService],
	exports: [ConfigService],
})
export class ConfigModule implements OnModuleInit {
	constructor(private readonly configService: ConfigService) {}

	public onModuleInit() {
		const config = this.configService.get();

		if (config.debugMode && process.env.NODE_ENV !== 'production') {
			console.log(config);
		}
	}
}
