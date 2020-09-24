import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

interface IsPriceOptions {
	/** @default true */
	required?: boolean;
	/** @default true */
	acceptNegatives?: boolean;
}

const defaultOptions: IsPriceOptions = {
	required: true,
	acceptNegatives: true,
};

export const IsPrice = (options?: IsPriceOptions) => {
	options = { ...defaultOptions, ...options };

	const { required, acceptNegatives } = options;

	const decorators = [
		required ? IsNotEmpty({ message: `The price is required` }) : IsOptional(),
	];

	let priceRegexp = /^([0-9]+)(.[0-9]{1,2})?$/;

	if (acceptNegatives) {
		priceRegexp = /^(-)?([0-9]+)(.[0-9]{1,2})?$/;
	}

	decorators.push(
		Matches(priceRegexp, {
			message: `The price must have a valid format. ${
				acceptNegatives
					? ''
					: 'The price must be greater than or equal to zero.'
			}`,
		}),
	);

	return applyDecorators(...decorators);
};
