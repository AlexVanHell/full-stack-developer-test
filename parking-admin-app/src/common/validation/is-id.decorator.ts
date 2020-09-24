import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional } from 'class-validator';

export interface IsIdOptions {
	/** @default true */
	required?: boolean;
	/** @default 'string' */
	type?: 'string' | 'number';
}

const defaultOptions: IsIdOptions = {
	required: true,
	type: 'string',
};

export const IsId = (options?: IsIdOptions) => {
	options = { ...defaultOptions, ...options };

	const { required } = options;

	const decorators = [
		required ? IsNotEmpty({ message: `The id is required` }) : IsOptional(),
	];

	return applyDecorators(...decorators);
};
