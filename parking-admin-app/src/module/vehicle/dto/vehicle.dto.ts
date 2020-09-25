import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../../common/dto/base.dto';
import { UserDto } from '../../user/dto/user.dto';
import { VehicleTypeEnum } from '../vehicle-type.enum';

export class VehicleDto extends BaseDto {
	@ApiProperty({
		description: `Vehicle's plates`,
		example: 'RTY-6894',
	})
	plates: string;

	@ApiProperty({
		description: `Vehicle's plates`,
		enum: VehicleTypeEnum,
		example: VehicleTypeEnum.OFFICIAL,
	})
	type: string;

	@ApiProperty({
		description: `Vehicle's plates`,
		example: 'Some Model',
	})
	modelName: string;

	@ApiProperty({
		description: `Vehicle's brand`,
		example: 'Some Brand',
	})
	brand: string;

	@ApiProperty({
		description: `Vehicle's year`,
		example: new Date().getFullYear(),
	})
	year: string;

	@ApiProperty({
		description: `Vehicle's color`,
		example: 'Blue',
	})
	color: string;

	@ApiProperty({
		description: `Vehicle's plates`,
		example: 'RTY-6894',
		type: () => UserDto,
	})
	user: UserDto;
}
