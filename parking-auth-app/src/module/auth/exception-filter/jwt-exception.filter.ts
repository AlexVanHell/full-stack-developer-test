import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ApiException } from '../../../common/api-exception/api-exception';
import { BaseExceptionFilter } from '../../../common/exception-filter/base-exception-filter';

@Catch(TokenExpiredError, JsonWebTokenError)
export class JwtExceptionFilter extends BaseExceptionFilter
	implements ExceptionFilter {
	public catch(
		exception: TokenExpiredError | JsonWebTokenError,
		host: ArgumentsHost,
	) {
		let apiError = '';

		if (exception instanceof TokenExpiredError) {
			apiError = 'TOKEN_EXPIRED';
		} else if (exception instanceof JsonWebTokenError) {
			apiError = 'TOKEN_INVALID';
		}

		const resultException = new ApiException(HttpStatus.UNAUTHORIZED, apiError);

		this.throwApiException(resultException, host, 'JwtExceptionFilter');
	}
}
