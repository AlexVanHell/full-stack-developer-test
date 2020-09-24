import { ApiProperty } from '@nestjs/swagger';
import { Newable } from '../type/newable.type';

export interface PaginatedInterface<T> {
	total: number;
	items: T[];
}

/**
 * @template T `items` type
 */
export function PaginationResponseDto<T extends Newable>(
	ResourceClass: T,
): Newable<PaginatedInterface<T>> {
	class Paginated implements PaginatedInterface<T> {
		@ApiProperty({
			description:
				'The total of items to be paginated. This is usefull for the client side.',
		})
		total: number;

		@ApiProperty({
			description: 'Paginated items',
			isArray: true,
			type: () => ResourceClass,
		})
		items: T[];
	}

	return Paginated;
}
