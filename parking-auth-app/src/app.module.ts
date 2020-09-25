import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { PasswordModule } from './module/password/password.module';
import { SharedModule } from './shared/shared.module';

@Module({
	imports: [SharedModule, PasswordModule, AuthModule],
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
