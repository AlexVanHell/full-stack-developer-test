import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Axios from 'axios';
import { ConfigJwtOptionsInterface } from '../../../config/interface/config-jwt-options.interface';
import { ConfigService } from '../../../config/service/config.service';
import { DateUtilService } from '../../../util/date/date-util.service';
import { PasswordUtilService } from '../../../util/password/password.util.service';
import { UserDto } from '../../user/dto/user.dto';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
	private readonly adminApiUrl: string;
	private readonly usersEndpoint = '/user/auth';

	constructor(
		configService: ConfigService,
		private readonly jwtService: JwtService,
		private readonly passwordUtil: PasswordUtilService,
		private readonly dateUtil: DateUtilService,
		@Inject('authJwtOptions')
		private readonly jwtOptions: ConfigJwtOptionsInterface,
	) {
		this.adminApiUrl = configService.get('endpoints')['admin-app'].url;
	}

	/**
	 * Validate user
	 * @param username Username or Email
	 * @param password Password
	 * @param strictSearch Indicate wheter the user should be searched by only one specific field
	 */
	public async validateUser(username: string, password: string) {
		const response = await Axios.get<UserDto>(
			`${this.adminApiUrl}${this.usersEndpoint}/${username}`,
			{
				params: {
					password: 'true',
				},
			},
		);
		const user = response.data;

		if (user) {
			const validPassword = await this.passwordUtil.compareString(
				password,
				user.password,
			);

			delete user.password;

			if (validPassword) {
				return user;
			}
		}

		return null;
	}

	/**
	 * Authenticate user
	 * @param user User object
	 */
	public async login(user: UserDto) {
		const accessToken = await this.jwtService.signAsync(user);

		const result = new AuthDto();
		result.user = user;
		result.token = {
			expiresAt: this.dateUtil.getExpirationDateByJwtStandard(
				this.jwtOptions.expiresIn,
			),
			accessToken,
		};

		return null;
	}
}
