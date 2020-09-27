import { HttpStatus, Injectable } from '@nestjs/common';
import Axios, { AxiosError } from 'axios';
import { ApiException } from '../../../common/api-exception/api-exception';
import { ConfigService } from '../../../config/service/config.service';
import { AuthUserDto } from '../dto/auth-user.dto';

@Injectable()
export class AuthService {
	private readonly validateEndpoint = '/validate';
	private readonly authApiUrl: string;

	constructor(configService: ConfigService) {
		this.authApiUrl = configService.get('endpoints')['auth-app'].url;
	}

	/**
	 * Validate token
	 * @param token
	 */
	public async validateToken(token: string) {
		try {
			const response = await Axios.get<AuthUserDto>(
				`${this.authApiUrl}${this.validateEndpoint}`,
				{
					headers: {
						Authorization: token,
					},
				},
			);

			return response.data;
		} catch (err) {
			const parsedError: AxiosError<{ code: string }> = err;

			if (
				parsedError.response &&
				parsedError.response.data &&
				parsedError.response.data.code
			) {
				throw new ApiException(
					HttpStatus.UNAUTHORIZED,
					parsedError.response.data.code,
				);
			}
		}
	}
}
