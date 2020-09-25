import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import Crypto from 'crypto';

@Injectable()
export class PasswordUtilService {
	private static instance: PasswordUtilService;

	public static getInstance() {
		if (this.instance) {
			return this.instance;
		}

		return new PasswordUtilService();
	}

	/**
	 * Hash any string
	 * @param value Plain string to hash
	 * @param saltOrRounds The salt string or number of salt rounds
	 */
	public async hashString(value: string, saltOrRounds: string | number) {
		const result = await hash(value, saltOrRounds);
		return result;
	}

	/**
	 * Compare any string to a hash
	 * @param value Value to compare with hash
	 * @param hash The hash that value is comparing
	 */
	public async compareString(value: string, hash: string) {
		return compare(value, hash);
	}

	/**
	 * Generate random string for password
	 * @param size Bytes size
	 */
	public generateRandom(size: number) {
		return Crypto.randomBytes(size).toString('hex');
	}
}
