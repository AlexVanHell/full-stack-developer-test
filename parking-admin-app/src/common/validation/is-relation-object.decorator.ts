import { applyDecorators } from '@nestjs/common';
import {
	IsNotEmpty,
	IsObject,
	IsOptional,
	ValidateNested,
} from 'class-validator';

interface IsRelationObjectOptions {
	/** @default true */
	required?: boolean;
	/** @default 'relation' */
	name?: string;
}

const defaultOptions: IsRelationObjectOptions = {
	required: true,
	name: 'relation',
};

export const IsRelationObject = (options?: IsRelationObjectOptions) => {
	options = { ...defaultOptions, ...options };

	const { required, name } = options;

	const decorators = [
		required
			? IsNotEmpty({ message: `The ${name} is required` })
			: IsOptional(),
		IsObject({ message: `The ${name} must be an object` }),
		ValidateNested({ message: `The ${name} must have valid structure` }),
	];

	return applyDecorators(...decorators);
};
