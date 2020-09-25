import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiExceptionResponse } from '../../../common/api-exception/api-exception-response.decorator';
import { API_ERRORS } from '../../../constant/api-errors.constant';
import { JwtAuthGuard } from '../guard/jwt/jwt-auth.guard';
import { RoleGuard } from '../guard/role/role.guard';
import { AuthOptions } from '../interface/auth-options.interface';

const defaultOptions: AuthOptions = {
	required: true,
	roles: [],
};

export const Auth = (options: AuthOptions = {}) =>
	applyDecorators(
		UseGuards(JwtAuthGuard, RoleGuard),
		SetMetadata('options', { ...defaultOptions, ...options }),
		ApiBearerAuth(),
		ApiExceptionResponse(
			API_ERRORS.TOKEN.NOT_PROVIDED,
			API_ERRORS.TOKEN.INVALID,
			API_ERRORS.TOKEN.EXPIRED,
			API_ERRORS.TOKEN.INSUFFICIENT_PERMISSIONS(options.roles || []),
		),
	);

export const DynamicAuth = (options: AuthOptions = {}) => {
	if (!!options) {
		return applyDecorators(Auth(options));
	} else {
		return applyDecorators();
	}
};
