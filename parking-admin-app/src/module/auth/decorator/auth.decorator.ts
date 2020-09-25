import {
	applyDecorators,
	HttpStatus,
	SetMetadata,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiExceptionResponse } from '../../../common/api-exception/api-exception-response.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { AuthOptions } from '../interface/auth-options.interface';

const defaultOptions: AuthOptions = {
	required: true,
};

const statusCode = HttpStatus.UNAUTHORIZED;

export const Auth = (options: AuthOptions = {}) =>
	applyDecorators(
		UseGuards(AuthGuard),
		SetMetadata('options', { ...defaultOptions, ...options }),
		ApiBearerAuth(),
		ApiExceptionResponse(
			{ statusCode, code: 'TOKEN_NOT_PROVIDED' },
			{ statusCode, code: 'TOKEN_INVALID' },
			{ statusCode, code: 'TOKEN_EXPIRED' },
		),
	);

export const DynamicAuth = (options: AuthOptions = {}) => {
	if (!!options) {
		return applyDecorators(Auth(options));
	} else {
		return applyDecorators();
	}
};
