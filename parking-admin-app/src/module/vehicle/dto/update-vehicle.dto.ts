import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { VehicleTypeEnum } from '../vehicle-type.enum';

export class UpdateVehicleDto {
	@ApiProperty({
		description: `Vehicle's plates`,
		example: 'RTY-6894',
	})
	@IsNotEmpty({ message: 'Plates field is required' })
	@IsString({ message: 'Field must be an string' })
	readonly plates: string;

	@ApiProperty({
		description: `Vehicle's plates`,
		enum: VehicleTypeEnum,
		example: VehicleTypeEnum.OFFICIAL,
	})
	@IsNotEmpty({ message: 'Type field is required' })
	@IsString({ message: 'Field must be an string' })
	@IsEnum(VehicleTypeEnum, { message: 'Field must contain valid enum value' })
	readonly type: VehicleTypeEnum;

	@ApiPropertyOptional({
		description: `Vehicle's plates`,
		example: 'Some Model',
	})
	@IsString({ message: 'Field must be an string' })
	readonly modelName: string;

	@ApiPropertyOptional({
		description: `Vehicle's brand`,
		example: 'Some Brand',
	})
	@IsString({ message: 'Field must be an string' })
	readonly brand: string;

	@ApiPropertyOptional({
		description: `Vehicle's year`,
		example: new Date().getFullYear(),
	})
	@IsString({ message: 'Field must be an string' })
	readonly year: string;

	@ApiPropertyOptional({
		description: `Vehicle's color`,
		example: 'Blue',
	})
	@IsString({ message: 'Field must be an string' })
	readonly color: string;

	@ApiProperty({
		description: `Vehicle's user id reference`,
		example: 'some-user-id',
	})
	@IsNotEmpty({ message: 'User is required' })
	@IsString({ message: 'Field must be an string' })
	readonly user: string;
}
