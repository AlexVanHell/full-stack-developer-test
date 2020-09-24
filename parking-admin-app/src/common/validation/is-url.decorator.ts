import { applyDecorators } from '@nestjs/common';
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	// IsUrl as IsSuperUrl,
} from 'class-validator';

interface IsUrlOptions {
	/** @default true */
	required?: boolean;
}

const defaultOptions: IsUrlOptions = {
	required: true,
};

export const IsUrl = (options?: IsUrlOptions) => {
	options = { ...defaultOptions, ...options };

	const { required } = options;

	const decorators = [
		required ? IsNotEmpty({ message: `The url is required` }) : IsOptional(),
		IsString({ message: `The url must be an string` }),
		// IsSuperUrl({}, { message: 'The url must be a valid url' }),
	];

	return applyDecorators(...decorators);
};
