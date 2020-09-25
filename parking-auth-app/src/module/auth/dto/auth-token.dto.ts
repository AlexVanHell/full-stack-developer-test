import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDto {
	@ApiProperty({
		description: 'The access token',
	})
	accessToken: string;

	@ApiProperty({
		description: 'Expiration date',
		example: new Date().toISOString(),
	})
	expiresAt: Date;
}
