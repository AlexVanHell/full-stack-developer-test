import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
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
		example: 'RESIDENT',
	})
	role: string;

	password?: string;
}
