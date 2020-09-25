import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthOptions } from '../interface/auth-options.interface';
import { AuthRequest } from '../interface/auth-request.interface';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly service: AuthService,
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const ctx = context.switchToHttp();
		const request = ctx.getRequest<AuthRequest>();
		const classOptions = this.reflector.get<AuthOptions>(
			'options',
			context.getClass(),
		);
		const handlerOptions = this.reflector.get<AuthOptions>(
			'options',
			context.getHandler(),
		);
		const options = { ...classOptions, ...handlerOptions };
		const token = request.get('Authorization');

		if (options.required || token) {
			const user = await this.service.validateToken(token);
			request.user = user;

			return true;
		}

		return false;
	}
}
