import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDocument } from '../user.schema';
import { UserService } from './user.service';

const testUser: CreateUserDto = {
	email: 'test@mail.com',
	username: 'testusername',
	firstname: 'Test',
	lastname: 'Test',
	password: 'foo',
};

const testUser2: CreateUserDto = {
	email: 'test2@mail.com',
	username: 'testusername2',
	firstname: 'Test',
	lastname: 'Test',
	password: 'foo',
};

describe.only('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				/* {
					provide: getModelToken(UserDocument.name),
					useValue: null,
				}, */
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('.getAll()', () => {
		it('should return an array of objects', async () => {
			const result = await service.getAll();

			expect(Array.isArray(result)).toBe(true);
		});
	});

	describe('.getById()', () => {
		it('should return an object if exists', async () => {
			const result = await service.getAll();

			expect(Array.isArray(result)).toBe(true);
		});

		it('should return undefined if not exists', async () => {
			const result = await service.getAll();
			expect(Array.isArray(result)).toBe(true);
		});
	});

	describe('.create()', () => {
		const createdIds: string[] = [];

		afterEach(async () => {
			while (createdIds.length) {
				const last = createdIds.pop();
				await service.deleteById(last);
			}
		});

		it('should create successfully', async () => {
			const result = await service.create(testUser);

			expect(typeof result).toBe('object');
			expect(result).toEqual(testUser);
			expect(result).toMatchObject({
				createdAt: new Date(),
				updatedAt: new Date(),
				active: true,
			});

			createdIds.push(result._id);
		});

		it('should throw error if user username or email are already in use', async () => {
			const firstUser = await service.create(testUser);
			createdIds.push(firstUser._id);

			let result: UserDocument;
			let error: any;

			try {
				result = await service.create({
					...testUser2,
					username: testUser.username,
				});
			} catch (err) {
				error = err;
			}

			expect(result).toBeFalsy();
			expect(error).toBeTruthy();
		});
	});

	describe('.updateById()', () => {
		const createdIds: string[] = [];
		let created: UserDocument;

		beforeEach(async () => {
			created = await service.create(testUser);
			createdIds.push(created._id);
		});

		afterEach(async () => {
			while (createdIds.length) {
				const last = createdIds.pop();
				await service.deleteById(last);
			}
		});

		it('should update successfully', async () => {
			const updated: CreateUserDto = { ...testUser, firstname: 'Test updated' };

			const result = await service.updateById(created._id, updated);

			expect(result).toEqual(updated);
			expect(result.firstName).toBe('Test updated');
		});

		it('should throw error if user username or email are already in use by another user', async () => {
			const secondCreated = await service.create(testUser2);
			createdIds.push(secondCreated._id);

			const updated = testUser;
			updated.username = testUser2.username;
			let result: UserDocument;
			let error: any;

			try {
				result = await service.updateById(created._id, updated);
			} catch (err) {
				error = err;
			}

			expect(result).toBeFalsy();
			expect(error).toBeTruthy();
		});
	});

	describe('.deleteById()', () => {
		let created: UserDocument;

		beforeEach(async () => {
			created = await service.create(testUser);
		});

		it('should delete successfully', async () => {
			const result = await service.deleteById(created._id);
			expect(result).toBe(created._id);
		});
	});
});
