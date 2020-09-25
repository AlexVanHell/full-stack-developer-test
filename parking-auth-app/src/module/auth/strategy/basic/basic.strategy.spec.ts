import { Test, TestingModule } from '@nestjs/testing';
import { BasicStrategy } from './basic.strategy';

describe('BasicStrategy', () => {
	let service: BasicStrategy;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [BasicStrategy],
		}).compile();

		service = module.get<BasicStrategy>(BasicStrategy);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
