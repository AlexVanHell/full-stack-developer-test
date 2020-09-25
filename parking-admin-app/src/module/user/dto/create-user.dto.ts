import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsNormalEmail } from '../../../common/validation/is-normal-email.decorator';
import { IsPassword } from '../../../common/validation/is-password.decorator';
import { IsPersonName } from '../../../common/validation/is-person-name.decorator';
import { IsUsername } from '../../../common/validation/is-username.decorator';
import { UserRoleEnum } from '../user-role.enum';

export class CreateUserDto {
	@ApiProperty({
		description: `User's firstname`,
		example: 'John',
	})
	@IsPersonName({ propertyName: 'firstname', minLength: 2, maxLength: 45 })
	readonly firstname: string;

	@ApiProperty({
		description: `User's lastname`,
		example: 'Doe',
	})
	@IsPersonName({ propertyName: 'lastname', minLength: 2, maxLength: 45 })
	readonly lastname: string;

	@ApiProperty({
		description: `User's unique username`,
		example: 'some-username',
	})
	@IsUsername({ enableLength: true })
	readonly username: string;

	@ApiProperty({
		description: `User's email`,
		example: 'some@mail.com',
	})
	@IsNormalEmail()
	readonly email: string;

	@ApiProperty({
		description: `User's password`,
		example: 'some_password',
	})
	@IsNotEmpty({ message: 'Role is required' })
	@IsString({ message: 'Role must be an string' })
	@IsEnum(UserRoleEnum, { message: 'Role must be a valid enum value' })
	readonly role: UserRoleEnum;

	@ApiProperty({
		description: `User's password`,
		example: 'some_password',
	})
	@IsPassword()
	readonly password: string;
}
