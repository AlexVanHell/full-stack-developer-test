import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

interface IsOrderOptions {
	/** @default true */
	required?: boolean;
}

const defaultOptions: IsOrderOptions = {
	required: true,
};

export const IsOrder = (options?: IsOrderOptions) => {
	options = { ...defaultOptions, ...options };

	const { required } = options;

	const decorators = [
		required ? IsNotEmpty({ message: `The order is required` }) : IsOptional(),
		IsNumber({}, { message: `The order must be a number` }),
		IsPositive({ message: 'The order must be a positive number' }),
	];

	return applyDecorators(...decorators);
};
