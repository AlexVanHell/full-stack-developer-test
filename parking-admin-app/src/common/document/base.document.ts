import { Prop } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export class BaseDocument extends Document {
	/* _id: string; */
	@Prop({
		type: SchemaTypes.Date
	})
	createdAt: Date;

	@Prop({
		type: SchemaTypes.Date
	})
	updatedAt: Date;

	@Prop()
	active: boolean;
}
