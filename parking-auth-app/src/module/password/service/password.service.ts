import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../../config/service/config.service';
import { PasswordUtilService } from '../../../util/password/password.util.service';

@Injectable()
export class PasswordService {
	constructor(
		private readonly configService: ConfigService,
		private readonly util: PasswordUtilService,
	) {}

	public async hashPassword(password: string) {
		return this.util.hashString(
			password,
			this.configService.get('password').saltRounds,
		);
	}
}
