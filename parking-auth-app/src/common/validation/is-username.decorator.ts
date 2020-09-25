import { applyDecorators } from '@nestjs/common';
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	Matches,
} from 'class-validator';

interface IsUsernameOptions {
	/** @default true */
	required?: boolean;
	/** @default true */
	enableLength?: boolean;
}

const defaultOptions: IsUsernameOptions = {
	required: true,
	enableLength: true,
};

export const IsUsername = (options?: IsUsernameOptions) => {
	options = { ...defaultOptions, ...options };

	const { required, enableLength } = options;

	const decorators = [
		required
			? IsNotEmpty({ message: `The username is required` })
			: IsOptional(),
		IsString({ message: `The username must be an string` }),
		Matches(/^[A-Za-z0-9_-]+$/, {
			message: `The username must match a valid name format. (Letters, numbers, "-" & "_" | No spaces)`,
		}),
	];

	if (enableLength) {
		decorators.push(
			Length(6, 45, {
				message: `The username must be at least 6 but not longer than 45 characters`,
			}),
		);
	}

	return applyDecorators(...decorators);
};
