import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
	@ApiPropertyOptional({
		description: 'Pagination offset',
		example: '0',
	})
	@IsOptional()
	@IsNumber(
		{ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
		{ message: 'The offset must be a number' },
	)
	@Min(0, { message: 'The offset must be greater than or equal to zero' })
	@Type(() => Number)
	offset?: number;

	@ApiPropertyOptional({
		description: 'Pagination limit',
		example: '20',
	})
	@IsOptional()
	@IsNumber(
		{ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
		{ message: 'The limit must be a number' },
	)
	@IsPositive({ message: 'The limit must be greater than zero' })
	@Type(() => Number)
	limit?: number;
}
