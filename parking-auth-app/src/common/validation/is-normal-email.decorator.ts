import { applyDecorators } from '@nestjs/common';
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
} from 'class-validator';

interface IsNormalEmailOptions {
	/** @default true */
	required?: boolean;
}

const defaultOptions: IsNormalEmailOptions = {
	required: true,
};

export const IsNormalEmail = (options?: IsNormalEmailOptions) => {
	options = { ...defaultOptions, ...options };

	const { required } = options;

	const decorators = [
		required ? IsNotEmpty({ message: `The email is required` }) : IsOptional(),
		IsString({ message: `The email must be an string` }),
		IsEmail({}, { message: `The email must have valid format` }),
		Length(6, 100, {
			message: `The email must be at least 6 but not longer than 100 characters`,
		}),
	];

	return applyDecorators(...decorators);
};
