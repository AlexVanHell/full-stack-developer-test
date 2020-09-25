import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiException } from '../../../common/api-exception/api-exception';
import { SimpleCrudService } from '../../../common/service/simple-crud.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
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
		await this.checkDuplicateUser(data.username, data.email);
		return super.create(data);
	}

	public async updateById(id: string, data: UpdateUserDto) {
		await this.checkDuplicateUser(data.username, data.email, id);
		return super.updateById(id, data);
	}

	/**
	 * Get user by username
	 * @param username Username to find
	 * @param id Check with the same id
	 */
	public async getByUsername(username: string, id?: string) {
		return await this.model.findOne({
			username,
			...(id ? { _id: { $ne: id } } : {}),
		});
	}

	/**
	 * Get user by email
	 * @param username Email to find
	 * @param id Check with the same id
	 */
	public async getByEmail(email: string, id?: string) {
		return this.model.findOne({
			email,
			...(id ? { _id: { $ne: id } } : {}),
		});
	}

	public getNotFoundError(): string {
		return 'USER_NOT_FOUND';
	}

	private async checkDuplicateUser(
		username: string,
		email: string,
		id?: string,
	) {
		const findWithUsername = await this.getByUsername(username, id);
		const findWithEmail = await this.getByEmail(email, id);

		if (findWithUsername) {
			throw new ApiException(HttpStatus.CONFLICT, 'USER_USERNAME_IN_USE');
		}

		if (findWithEmail) {
			throw new ApiException(HttpStatus.CONFLICT, 'USER_EMAIL_IN_USE');
		}
	}
}
