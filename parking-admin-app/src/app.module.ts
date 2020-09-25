import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { VehicleModule } from './module/vehicle/vehicle.module';
import { SharedModule } from './shared/shared.module';

@Module({
	imports: [
		DatabaseModule,
		SharedModule,
		UserModule,
		VehicleModule,
		AuthModule,
	],
	controllers: [],
	providers: [AppService],
})
export class AppModule implements OnModuleInit {
	public onModuleInit() {
		Logger.log(
			`You can see api-docs at http://localhost:${process.env.PORT}/api-docs`,
			AppModule.name,
		);
	}
}
