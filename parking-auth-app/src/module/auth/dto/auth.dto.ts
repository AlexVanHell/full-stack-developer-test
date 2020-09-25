import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';
import { AuthTokenDto } from './auth-token.dto';

export class AuthDto {
	@ApiProperty({
		description: 'User main information',
	})
	user: UserDto;

	@ApiProperty({
		description: 'Authorization token information',
	})
	token: AuthTokenDto;
}
