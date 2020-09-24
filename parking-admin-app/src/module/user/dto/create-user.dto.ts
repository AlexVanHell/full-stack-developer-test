import { ApiProperty } from '@nestjs/swagger';
import { IsNormalEmail } from '../../../common/validation/is-normal-email.decorator';
import { IsPassword } from '../../../common/validation/is-password.decorator';
import { IsPersonName } from '../../../common/validation/is-person-name.decorator';
import { IsUsername } from '../../../common/validation/is-username.decorator';

export class CreateUserDto {
	@ApiProperty({
		description: `User's firstname`,
		example: 'John',
	})
	@IsPersonName({ propertyName: 'firstname', minLength: 2, maxLength: 45 })
	firstname: string;

	@ApiProperty({
		description: `User's lastname`,
		example: 'Doe',
	})
	@IsPersonName({ propertyName: 'lastname', minLength: 2, maxLength: 45 })
	lastname: string;

	@ApiProperty({
		description: `User's unique username`,
		example: 'some-username',
	})
	@IsUsername({ enableLength: true })
	username: string;

	@ApiProperty({
		description: `User's email`,
		example: 'some@mail.com',
	})
	@IsNormalEmail()
	email: string;

	@ApiProperty({
		description: `User's password`,
		example: 'some_password',
	})
	@IsPassword()
	password: string;
}
