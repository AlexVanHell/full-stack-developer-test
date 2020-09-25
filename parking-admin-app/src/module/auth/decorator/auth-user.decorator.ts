import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserDto } from '../dto/auth-user.dto';
import { AuthRequest } from '../interface/auth-request.interface';

export const AuthUser = createParamDecorator(
	(data: keyof AuthUserDto, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<AuthRequest>();
		const token = request.get('Authorization');
		const user = request.user;
		user.token = token;

		return data ? user && user[data] : user;
	},
);
