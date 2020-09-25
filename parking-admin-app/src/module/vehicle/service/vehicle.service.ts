import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SimpleCrudService } from '../../../common/service/simple-crud.service';
import { VehicleDocument } from '../vehicle.schema';

@Injectable()
export class VehicleService extends SimpleCrudService<VehicleDocument> {
	constructor(
		@InjectModel(VehicleDocument.name) model: Model<VehicleDocument>,
	) {
		super(model);
	}
}
