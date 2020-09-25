import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../../shared/shared.module';
import { VehicleController } from './controller/vehicle.controller';
import { VehicleService } from './service/vehicle.service';
import { VehicleDocument, VehicleSchema } from './vehicle.schema';

@Module({
	controllers: [VehicleController],
	providers: [VehicleService],
	imports: [
		SharedModule,
		MongooseModule.forFeature([
			{ name: VehicleDocument.name, schema: VehicleSchema },
		]),
	],
})
export class VehicleModule {}
