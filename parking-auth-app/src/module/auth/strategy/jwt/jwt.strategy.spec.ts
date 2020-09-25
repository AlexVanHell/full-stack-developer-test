import { Test, TestingModule } from '@nestjs/testing';
import { JwtCustomModule } from '../../jwt/jwt-custom.module';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
	let service: JwtStrategy;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [JwtStrategy],
			imports: [JwtCustomModule.forRoot('auth')],
		}).compile();

		service = module.get<JwtStrategy>(JwtStrategy);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
