import { ApiProperty } from '@nestjs/swagger';
import { IsPassword } from '../../../common/validation/is-password.decorator';
import { IsUsername } from '../../../common/validation/is-username.decorator';

export class LoginDto {
	@ApiProperty({
		description: `User's username or email`,
		required: true,
		example: 'some_username',
	})
	@IsUsername({ enableLength: false })
	readonly username: string;

	@ApiProperty({
		description: `User's passsword`,
		required: true,
		example: 'some_password',
	})
	@IsPassword({ enableLength: false })
	readonly password: string;
}
