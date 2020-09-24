import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './module/user/user.module';
import { VehicleModule } from './module/vehicle/vehicle.module';
import { EstablishmentModule } from './module/establishment/establishment.module';

@Module({
	imports: [DatabaseModule, SharedModule, UserModule, VehicleModule, EstablishmentModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
