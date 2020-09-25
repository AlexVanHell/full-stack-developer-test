import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { ApiException } from './api-exception';

interface InitialValueInterface {
	array: ApiResponseOptions[];
	map: Map<HttpStatus, ApiResponseOptions>;
}

export const ApiExceptionResponse = (
	...payloads: { statusCode: HttpStatus; code: string }[]
) => {
	const statusGroups = payloads.reduce(
		(result, payload) => {
			if (!!payload) {
				if (!result.map.has(payload.statusCode)) {
					const obj = {
						status: payload.statusCode,
						description: '',
						type: ApiException,
					};

					result.map.set(payload.statusCode, obj);
					result.array.push(obj);
				}
			}
			return result;
		},
		{ array: [], map: new Map() } as InitialValueInterface,
	);

	return applyDecorators(...statusGroups.array.map(item => ApiResponse(item)));
};
