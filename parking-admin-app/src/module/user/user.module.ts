import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../../shared/shared.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserDocument, UserSchema } from './user.schema';

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [
		SharedModule,
		MongooseModule.forFeature([
			{ name: UserDocument.name, schema: UserSchema },
		]),
	],
})
export class UserModule {}
