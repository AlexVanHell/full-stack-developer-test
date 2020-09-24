import { applyDecorators } from '@nestjs/common';
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	Matches,
} from 'class-validator';

interface IsItemNameOptions {
	/** @default true */
	required?: boolean;
}

const defaultOptions: IsItemNameOptions = {
	required: true,
};

export const IsItemName = (options?: IsItemNameOptions) => {
	options = { ...defaultOptions, ...options };

	const { required } = options;

	const decorators = [
		required ? IsNotEmpty({ message: `The name is required` }) : IsOptional(),
		IsString({ message: `The name must be an string` }),
		Matches(/^[A-Za-z0-9_-]+$/, {
			message: `The name must match a valid name format. (Letters, numbers, "-" & "_" | No spaces)`,
		}),
		Length(3, 125, {
			message: `The name must be at least 3 but not longer than 125 characters`,
		}),
	];

	return applyDecorators(...decorators);
};
