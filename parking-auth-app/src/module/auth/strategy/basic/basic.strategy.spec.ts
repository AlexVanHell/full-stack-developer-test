import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../../../../shared/shared.module';
import { JwtCustomModule } from '../../jwt/jwt-custom.module';
import { AuthService } from '../../service/auth.service';
import { BasicStrategy } from './basic.strategy';

describe('BasicStrategy', () => {
	let service: BasicStrategy;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [BasicStrategy, AuthService],
			imports: [SharedModule, JwtCustomModule.forRoot('auth')],
		}).compile();

		service = module.get<BasicStrategy>(BasicStrategy);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
