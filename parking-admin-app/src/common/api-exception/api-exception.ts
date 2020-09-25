import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @template E Errors type
 * @template T Extra data type
 */
export class ApiException<E = any> extends Error {
	@ApiProperty({
		description: 'Http status code',
		example: HttpStatus.INTERNAL_SERVER_ERROR,
	})
	statusCode: HttpStatus;

	@ApiProperty({
		description: 'Error code. Each code describe an specific case to developer',
		example: 'SOME_ERROR',
	})
	code: string;

	@ApiProperty({
		description: 'Error message',
	})
	message: string;

	@ApiProperty({
		description: 'Error timestamp',
		example: new Date().toISOString(),
	})
	timestamp: string;

	@ApiProperty({
		description: 'Request URL path',
	})
	path: string;

	@ApiProperty({
		description: 'Errors description',
	})
	errors?: E;

	/**
	 *
	 * @param payload Error payload
	 * @param errors Description errors
	 * @param message Custom message. Override error payload message
	 * @param data Aditional data
	 */
	constructor(
		statusCode: HttpStatus,
		code: string,
		errors?: E,
		message?: string,
	) {
		super(message || code);
		this.statusCode = statusCode;
		this.code = code;
		this.errors = errors;
	}
}
