import { HttpStatus, Injectable } from '@nestjs/common';
import Axios, { AxiosError } from 'axios';
import { ApiException } from '../../../common/api-exception/api-exception';
import { ConfigService } from '../../../config/service/config.service';
import { AuthUserDto } from '../dto/auth-user.dto';

@Injectable()
export class AuthService {
	private readonly authEndpoint: string;

	constructor(configService: ConfigService) {
		const config = configService.get('endpoints')['auth-app'];
		this.authEndpoint = `http://${config.host}:${config.port}/${config.prefix ||
			''}/validate`;
	}

	/**
	 * Validate token
	 * @param token
	 */
	public async validateToken(token: string) {
		try {
			const response = await Axios.get<AuthUserDto>(this.authEndpoint, {
				headers: {
					Authorization: token,
				},
			});

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
