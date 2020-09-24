import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

interface IsImageOptions {
	/** @default true */
	required?: boolean;
	/** @default 'image' */
	propertyName?: string;
}

const defaultOptions: IsImageOptions = {
	required: true,
	propertyName: 'image',
};

export const IsImage = (options?: IsImageOptions) => {
	options = { ...defaultOptions, ...options };

	const { required, propertyName } = options;

	const decorators = [
		required
			? IsNotEmpty({ message: `The ${propertyName} is required` })
			: IsOptional(),
		IsString({ message: `The ${propertyName} must be an string` }),
		/* Length(4, 45, {
      message: `The ${propertyName} must be at least 4 but not longer than 45 characters`,
    }), */
	];

	return applyDecorators(...decorators);
};
