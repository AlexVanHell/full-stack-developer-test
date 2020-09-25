import {
	CanActivate,
	ExecutionContext,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ApiException } from '../../../../common/api-exception/api-exception';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') implements CanActivate {
	public canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}

	public handleRequest(err: any, user: any) {
		if (err instanceof UnauthorizedException) {
			throw new ApiException(HttpStatus.UNAUTHORIZED, 'USER_NO_BASIC_AUTH');
		} else if (err) {
			throw err;
		}

		return user;
	}
}
