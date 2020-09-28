import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { ApiException } from '../../../../common/api-exception/api-exception';
import { AuthService } from '../../service/auth.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
	constructor(private authService: AuthService) {
		super();
	}

	public async validate(username: string, password: string) {
		const user = await this.authService.validateUser(username, password);

		if (!user) {
			throw new ApiException(HttpStatus.UNAUTHORIZED, 'USER_BAD_CREDENTIALS');
		}

		return user;
	}
}
