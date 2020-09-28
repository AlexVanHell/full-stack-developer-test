import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../common/document/base.document';

export interface UserInterface {
	firstname: string;
	lastname: string;
	username: string;
	email: string;
	password: string;
}

@Schema()
export class UserDocument extends BaseDocument implements UserInterface {
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
