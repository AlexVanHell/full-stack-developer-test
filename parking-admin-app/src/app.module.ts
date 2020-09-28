import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './config/service/config.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './module/auth/auth.module';
import { CreateUserDto } from './module/user/dto/create-user.dto';
import { UserService } from './module/user/service/user.service';
import { UserRoleEnum } from './module/user/user-role.enum';
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
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
	) {}

	public async onModuleInit() {
		Logger.log(
			`You can see api-docs at http://localhost:${process.env.PORT}/api-docs`,
			AppModule.name,
		);

		const debugMode = this.configService.get('debugMode');
		const admin = this.configService.get('adminUser');

		if (debugMode) {
			Logger.log(`Creating admin user`, AppModule.name);
		}

		try {
			const exists = await this.userService.getByUsername(admin.username);

			if (!exists) {
				await this.userService.create({
					...admin,
					role: UserRoleEnum.ADMIN,
				} as CreateUserDto);
				if (debugMode) {
					Logger.log(`User created`, AppModule.name);
				}
			}
		} catch (err) {
			Logger.error(err, AppModule.name);
		}
	}
}
