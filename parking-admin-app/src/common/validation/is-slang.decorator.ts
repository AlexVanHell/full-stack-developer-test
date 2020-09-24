import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

interface IsSlangOptions {
	/** @default true */
	required?: boolean;
	/** @default 'slang' */
	propertyName?: string;
}

const defaultOptions: IsSlangOptions = {
	required: true,
	propertyName: 'slang',
};

export const IsSlang = (options?: IsSlangOptions) => {
	options = { ...defaultOptions, ...options };

	const { required, propertyName } = options;

	const decorators = [
		required
			? IsNotEmpty({ message: `The ${propertyName} is required` })
			: IsOptional(),
		IsString({ message: `The ${propertyName} must be an string` }),
		/* Matches(/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ_-\s]+$/, { // Uncomment this block to apply pattern validation
      message: `The name must match a valid name format. (Letters, numbers, "-" & "_" | No spaces)`,
    }), */
		Length(3, 125, {
			message: `The ${propertyName} must be at least 3 but not longer than 125 characters`,
		}),
	];

	return applyDecorators(...decorators);
};
