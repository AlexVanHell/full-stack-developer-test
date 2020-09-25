import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';

/**
 * Don't expose this class on swagger, use UserDto instead.
 * The decorator is only for internal documentation porpouses
 */
export class AuthUserDto extends UserDto {
	@ApiProperty({
		description: `The user's authorization token`,
	})
	token: string;
}
