import { ApiProperty } from '@nestjs/swagger';
import { IsNormalEmail } from '../../../common/validation/is-normal-email.decorator';
import { IsPersonName } from '../../../common/validation/is-person-name.decorator';
import { IsUsername } from '../../../common/validation/is-username.decorator';

export class UpdateUserDto {
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
}
