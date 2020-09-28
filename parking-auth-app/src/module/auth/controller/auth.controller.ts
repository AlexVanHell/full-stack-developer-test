import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import {
	ApiBasicAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { ApiExceptionResponse } from '../../../common/api-exception/api-exception-response.decorator';
import { UserDto } from '../../user/dto/user.dto';
import { AuthUser } from '../decorator/auth-user.decorator';
import { Auth } from '../decorator/auth.decorator';
import { AuthUserDto } from '../dto/auth-user.dto';
import { AuthDto } from '../dto/auth.dto';
import { BasicAuthGuard } from '../guard/basic/basic-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private service: AuthService) {}

	@UseGuards(BasicAuthGuard)
	@Get('/login')
	@ApiOperation({
		summary: 'Authenticate user by its credentials',
	})
	@ApiBasicAuth()
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'User information and its token',
		type: AuthDto,
	})
	@ApiExceptionResponse(
		{
			statusCode: HttpStatus.UNAUTHORIZED,
			code: 'USER_BAD_CREDENTIALS',
		},
		{
			statusCode: HttpStatus.UNAUTHORIZED,
			code: 'USER_NO_BASIC_AUTH',
		},
	)
	public async login(@AuthUser() user: UserDto) {
		return this.service.login(user);
	}

	@Get('/validate')
	@Auth()
	@ApiOperation({
		summary: 'Validate jwt token',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'User information and its token',
		type: AuthUserDto,
	})
	@ApiExceptionResponse(
		{
			statusCode: HttpStatus.UNAUTHORIZED,
			code: 'TOKEN_INVALID',
		},
		{
			statusCode: HttpStatus.UNAUTHORIZED,
			code: 'TOKEN_EXPIRED',
		},
		{
			statusCode: HttpStatus.UNAUTHORIZED,
			code: 'TOKEN_NOT_PROVIDED',
		},
	)
	public async validateToken(@AuthUser() user: AuthUserDto) {
		// In this step the token is already validated thanks to the @Auth decorator
		// So just return the user decoded
		return user;
	}
}
