import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
	let service: ConfigService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ConfigService],
		}).compile();

		service = module.get<ConfigService>(ConfigService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('.get()', () => {
		it('should be get entire config object when no parameters are sent', () => {
			const obj = service.get();

			expect(Object.keys(obj)).toEqual(
				expect.arrayContaining(['debugMode', 'dir', 'password', 'auth']),
			);
		});

		it('should be get one property when parameter is sent', () => {
			const obj = service.get('password');
			const obj2 = service.get('dir');
			const obj3 = service.get('debugMode');
			const obj4 = service.get('auth');

			expect(Object.keys(obj)).toEqual(expect.arrayContaining(['saltRounds']));
			expect(Object.keys(obj2)).toEqual(
				expect.arrayContaining(['root', 'src', 'working']),
			);
			expect(typeof obj3).toBe('boolean');
			expect(Object.keys(obj4)).toEqual(
				expect.arrayContaining(['secret', 'expiresIn']),
			);
		});
	});
});
