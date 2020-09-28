import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseDocument } from '../../common/document/base.document';
import { UserDocument } from '../user/user.schema';
import { VehicleTypeEnum } from './vehicle-type.enum';

export interface VehicleInterface {
	plates: string;
	type: VehicleTypeEnum;
	user: string;
	modelName: string;
	brand: string;
	year: string;
	color: string;
}

@Schema()
export class VehicleDocument extends BaseDocument implements VehicleInterface {
	@Prop({
		unique: true,
	})
	plates: string;

	@Prop({
		enum: [VehicleTypeEnum.OFFICIAL, VehicleTypeEnum.RESIDENT],
	})
	type: VehicleTypeEnum;

	@Prop({
		type: SchemaTypes.ObjectId,
		required: true,
		ref: UserDocument.name,
	})
	user: string;

	@Prop()
	modelName: string;

	@Prop()
	brand: string;

	@Prop()
	year: string;

	@Prop()
	color: string;
}

export const VehicleSchema = SchemaFactory.createForClass(VehicleDocument);
