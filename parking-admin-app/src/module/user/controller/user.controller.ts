import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiException } from '../../../common/api-exception/api-exception';
import { ApiExceptionResponse } from '../../../common/api-exception/api-exception-response.decorator';
import { Auth } from '../../auth/decorator/auth.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('/users')
@Auth()
@ApiTags('Users')
export class UserController {
	constructor(private service: UserService) {}

	@Get()
	@ApiOperation({
		summary: 'Get users',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Users list',
		isArray: true,
		type: UserDto,
	})
	public async getAll() {
		return this.service.getAll();
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({
		summary: 'Create new user',
	})
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Created user object',
		type: UserDto,
	})
	@ApiExceptionResponse(
		{ statusCode: HttpStatus.CONFLICT, code: 'USER_USERNAME_IN_USE' },
		{ statusCode: HttpStatus.CONFLICT, code: 'USER_EMAIL_IN_USE' },
	)
	public async create(@Body() body: CreateUserDto) {
		const user = await this.service.create(body);
		return user;
	}

	@Get('/:id([a-z0-9_-]+)')
	@ApiOperation({
		summary: 'Get user by username',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'User object',
		type: UserDto,
	})
	@ApiExceptionResponse({
		statusCode: HttpStatus.NOT_FOUND,
		code: 'USER_NOT_FOUND',
	})
	public async getByUsername(@Param('id') id: string) {
		const user = this.service.getById(id);

		if (!user) {
			throw new ApiException(HttpStatus.NOT_FOUND, 'USER_NOT_FOUND');
		}
	}

	@Put('/:id([a-z0-9_-]+)')
	@ApiOperation({
		summary: 'Update existing user',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Updated user object',
		type: UserDto,
	})
	@ApiExceptionResponse(
		{ statusCode: HttpStatus.NOT_FOUND, code: 'USER_NOT_FOUND' },
		{ statusCode: HttpStatus.CONFLICT, code: 'USER_USERNAME_IN_USE' },
		{ statusCode: HttpStatus.CONFLICT, code: 'USER_EMAIL_IN_USE' },
	)
	public async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this.service.updateById(id, body);
	}

	@Delete('/:id([a-z0-9_-]+)')
	@ApiOperation({
		summary: 'Delete existing user',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Empty response',
	})
	@ApiExceptionResponse({
		statusCode: HttpStatus.NOT_FOUND,
		code: 'USER_NOT_FOUND',
	})
	public async delete(@Param('id') id: string) {
		return this.service.deleteById(id);
	}
}
