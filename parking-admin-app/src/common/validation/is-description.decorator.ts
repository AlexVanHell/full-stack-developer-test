import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

interface IsDescriptionOptions {
	/** @default true */
	required?: boolean;
	/** @default 10 */
	minLength?: number;
	/** @default 1000 */
	maxLength?: number;
}

const defaultOptions: IsDescriptionOptions = {
	required: true,
	minLength: 10,
	maxLength: 500,
};

export const IsDescription = (options?: IsDescriptionOptions) => {
	options = { ...defaultOptions, ...options };

	const { required, minLength, maxLength } = options;

	const decorators = [
		required
			? IsNotEmpty({ message: `The description is required` })
			: IsOptional(),
		IsString({ message: `The description must be an string` }),
		/* Matches(/^[a-z0-9_-]+$/, {
      message: `The description must match a valid name format. (Lowercase letters, numbers, "-" & "_" | No spaces)`,
    }), */
		Length(minLength, maxLength, {
			message: `The description must be at least 10 but not longer than 500 characters`,
		}),
	];

	return applyDecorators(...decorators);
};
