import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

interface IsPersonNameOptions {
	/** @default true */
	required?: boolean;
	/** @default 'name' */
	propertyName?: string;
	/** @default 2 */
	minLength?: number;
	/** @default 45 */
	maxLength?: number;
}

const defaultOptions: IsPersonNameOptions = {
	required: true,
	propertyName: 'name',
	minLength: 2,
	maxLength: 45,
};

export const IsPersonName = (options?: IsPersonNameOptions) => {
	options = { ...defaultOptions, ...options };

	const { required, propertyName, minLength, maxLength } = options;

	const decorators = [
		required
			? IsNotEmpty({ message: `The ${propertyName} is required` })
			: IsOptional(),
		IsString({ message: `The ${propertyName} must be an string` }),
		Length(minLength, maxLength, {
			message: `The ${propertyName} must be at least ${minLength} but not longer than ${maxLength} characters`,
		}),
	];

	return applyDecorators(...decorators);
};
