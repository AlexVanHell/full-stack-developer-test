import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/service/config.service';
import { PasswordUtilService } from './password.util.service';

describe('PasswordUtilService', () => {
	let service: PasswordUtilService;
	let configService: ConfigService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PasswordUtilService],
			imports: [ConfigModule],
		}).compile();

		service = module.get<PasswordUtilService>(PasswordUtilService);
		configService = module.get<ConfigService>(ConfigService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('.hashString()', () => {
		it('should hash string', async () => {
			const testString = 'test-string';

			const result = await service.hashString(
				testString,
				configService.get('password').saltRounds,
			);

			expect(typeof result).toBe('string');
			expect(result).not.toBe(testString);
		});
	});

	describe('.compareString()', () => {
		const testString = 'test-string';
		const testStringFail = 'test-string-fail';
		let hashed: string;

		beforeEach(async () => {
			hashed = await service.hashString(
				testString,
				configService.get('password').saltRounds,
			);
		});

		it('should return true if comparing is right', async () => {
			const result = await service.compareString(testString, hashed);
			expect(result).toBe(true);
		});

		it('should return false if comparing is right', async () => {
			const result = await service.compareString(testStringFail, hashed);
			expect(result).toBe(false);
		});
	});

	describe('.generateRandom()', () => {
		it('should generate random string of size', async () => {
			const size = 30;
			const byteSize = 2;

			const result = service.generateRandom(size);

			expect(typeof result).toBe('string');
			expect(result.length).toBeGreaterThan(size);
			expect(result.length).toBe(size * byteSize);
		});
	});
});
