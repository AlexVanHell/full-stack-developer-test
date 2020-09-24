import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../../config/config.module';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
	let service: DatabaseService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
      imports: [ConfigModule]
		}).compile();

		service = module.get<DatabaseService>(DatabaseService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('.createMongooseOptions()', () => {
		it('should create connection options', () => {
      const obj = service.createMongooseOptions();

      expect(typeof obj).toBe('object');
      expect(Object.keys(obj)).toEqual(expect.arrayContaining(['uri', 'auth']));
    });
	});
});
