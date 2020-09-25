import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PasswordService } from '../service/password.service';

@Controller('/password')
@ApiTags('Password')
export class PasswordController {
	constructor(private readonly service: PasswordService) {}

	@Get('/generate')
	@ApiOperation({
		summary: 'Generate hashed password',
	})
	@ApiBody({
		schema: {
			properties: {
				password: {
					type: 'string',
					example: 'some-password',
				},
			},
		},
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Object containing hashed password',
		schema: {
			properties: {
				hashed: {
					type: 'string',
					example: 'some-hashed-password',
				},
			},
		},
	})
	public async hashPassword(@Body() body: { password: string }) {
		const hashed = await this.service.hashPassword(body.password);
		return { hashed };
	}
}
