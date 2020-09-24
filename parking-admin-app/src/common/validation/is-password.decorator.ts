import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

interface IsPasswordOptions {
	/** @default true */
	required?: boolean;
	/** @default 'password' */
	propertyName?: string;
	/**
	 * Min: 6, Max: 45
	 * @default true
	 */
	enableLength?: boolean;
}

const defaultOptions: IsPasswordOptions = {
	required: true,
	propertyName: 'password',
	enableLength: true,
};

export const IsPassword = (options?: IsPasswordOptions) => {
	options = { ...defaultOptions, ...options };

	const { required, propertyName, enableLength } = options;

	const decorators = [
		required
			? IsNotEmpty({ message: `The ${propertyName} is required` })
			: IsOptional(),
		IsString({ message: `The ${propertyName} must be an string` }),
	];

	if (enableLength) {
		decorators.push(
			Length(6, 45, {
				message: `The ${propertyName} must be at least 6 but not longer than 45 characters`,
			}),
		);
	}

	return applyDecorators(...decorators);
};
