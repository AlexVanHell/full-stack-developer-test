import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../../../shared/shared.module';
import { JwtCustomModule } from '../jwt/jwt-custom.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService],
			imports: [SharedModule, JwtCustomModule.forRoot('auth')],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
