import { applyDecorators } from '@nestjs/common';
import {
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
} from 'class-validator';

export const IsIdsArray = (type: 'string' | 'number') => {
	const message = `The array item must be of type ${type}`;
	const decorators = [
		IsNotEmpty({ message: 'The ids are required' }),
		IsArray({ message: 'The ids must be an array' }),
		type === 'number'
			? IsNumber(
					{ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
					{
						each: true,
						message,
					},
			  )
			: IsString({ each: true, message }),
	];

	if (type === 'number') {
		decorators.push(
			IsPositive({
				each: true,
				message: 'The array item must be positive number',
			}),
		);
	}

	return applyDecorators(...decorators);
};
