import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseExceptionFilter } from '../../exception-filter/base-exception-filter';
import { ApiException } from '../api-exception';

@Catch(ApiException)
export class ApiExceptionFilter extends BaseExceptionFilter
	implements ExceptionFilter {
	public catch(exception: ApiException, host: ArgumentsHost) {
		this.throwApiException(exception, host, 'ApiExceptionFilter');
	}
}
