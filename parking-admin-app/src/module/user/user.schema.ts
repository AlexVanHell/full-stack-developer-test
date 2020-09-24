import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../common/document/base.document';

@Schema()
export class UserDocument extends BaseDocument {
	@Prop()
	firstname: string;

	@Prop()
	lastname: string;

	@Prop()
	username: string;

	@Prop()
	email: string;

	@Prop()
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
