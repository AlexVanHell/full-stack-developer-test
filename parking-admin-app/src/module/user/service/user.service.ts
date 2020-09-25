import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiException } from '../../../common/api-exception/api-exception';
import { SimpleCrudService } from '../../../common/service/simple-crud.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDocument } from '../user.schema';

@Injectable()
export class UserService extends SimpleCrudService<UserDocument> {
	constructor(
		@InjectModel(UserDocument.name)
		model: Model<UserDocument>,
	) {
		super(model);
	}

	public async create(data: CreateUserDto) {
		const findWithUsername = await this.model.findOne({
			username: data.username,
		});
		const findWithEmail = await this.model.findOne({
			email: data.email,
		});

		if (findWithUsername) {
			throw new Error('Username is already in use');
		}

		if (findWithEmail) {
			throw new Error('Email is already in use');
		}

		return super.create(data);
	}

	public async updateById(id: string, data: CreateUserDto) {
		const findWithUsername = await this.model.findOne({
			username: data.username,
			_id: { $ne: id },
		});
		const findWithEmail = await this.model.findOne({
			email: data.email,
			_id: { $ne: id },
		});

		if (findWithUsername) {
			throw new ApiException(HttpStatus.CONFLICT, 'USER_USERNAME_IN_USE');
		}

		if (findWithEmail) {
			throw new ApiException(HttpStatus.CONFLICT, 'USER_EMAIL_IN_USE');
		}

		return super.updateById(id, data);
	}
}
