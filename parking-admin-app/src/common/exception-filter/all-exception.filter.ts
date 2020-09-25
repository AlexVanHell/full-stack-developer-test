import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter,
	HttpStatus,
	NotFoundException,
} from '@nestjs/common';
import { ApiException } from '../api-exception/api-exception';
import { BaseExceptionFilter } from './base-exception-filter';

interface CustomError {
	name: string;
	trace: string | Record<string, unknown>;
}

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter
	implements ExceptionFilter {
	public catch(exception: unknown, host: ArgumentsHost) {
		let apiError = {
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			code: 'INTERNAL_SERVER_ERROR',
		};
		let error: CustomError | string | string[] = null;

		if (exception instanceof BadRequestException) {
			apiError = {
				statusCode: HttpStatus.BAD_REQUEST,
				code: 'CLIENT_BAD_REQUEST',
			};
			error = (exception.getResponse() as { message: string }).message;
		} else if (exception instanceof NotFoundException) {
			apiError = {
				statusCode: HttpStatus.NOT_FOUND,
				code: 'CLIENT_RESOURCE_NOT_FOUND',
			};
			error = (exception.getResponse() as { message: string }).message;
		} else if (exception instanceof Error) {
			error = {
				name: exception.name,
				trace: exception.message,
			};
		} else if (typeof exception === 'object') {
			error = {
				name: 'N/A',
				trace: exception as Record<string, unknown>,
			};
		} else if (typeof exception === 'string') {
			error = {
				name: 'N/A',
				trace: exception,
			};
		}

		const resultException = new ApiException(
			apiError.statusCode,
			apiError.code,
			error,
		);

		this.throwApiException(resultException, host, 'AllExceptionFilter');
	}
}
