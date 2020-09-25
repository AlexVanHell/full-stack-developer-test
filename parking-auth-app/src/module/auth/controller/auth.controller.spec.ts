import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../../../shared/shared.module';
import { JwtCustomModule } from '../jwt/jwt-custom.module';
import { AuthService } from '../service/auth.service';
import { AuthController } from './auth.controller';

describe('Auth Controller', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService],
			imports: [SharedModule, JwtCustomModule.forRoot('auth')],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
