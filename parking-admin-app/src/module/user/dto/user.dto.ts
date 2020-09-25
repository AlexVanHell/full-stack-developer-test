import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../../common/dto/base.dto';
import { VehicleDto } from '../../vehicle/dto/vehicle.dto';
import { UserRoleEnum } from '../user-role.enum';

export class UserDto extends BaseDto {
	@ApiProperty({
		description: `User's id`,
		example: 'some-id',
	})
	_id: string;

	@ApiProperty({
		description: `User's unique username`,
		example: 'some-username',
	})
	username: string;

	@ApiProperty({
		description: `User's email`,
		example: 'user@mail.com',
	})
	email: string;

	@ApiProperty({
		description: `User's firstname`,
		example: 'John',
	})
	firstname: string;

	@ApiProperty({
		description: `User's lastname`,
		example: 'Doe',
	})
	lastname: string;

	@ApiProperty({
		description: `User's role`,
		example: UserRoleEnum.OFFICIAL,
	})
	role: UserRoleEnum;

	@ApiProperty({
		description: `User's vehicles`,
		type: () => VehicleDto,
		isArray: true,
	})
	vehicles: VehicleDto;

	password?: string;
}
