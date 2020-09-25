import { Injectable } from '@nestjs/common';
import moment, { DurationInputArg2 } from 'moment';

@Injectable()
export class DateUtilService {
	/**
	 * Get an expiration date from current date
	 * @param expiresIn JWT expiresIn format
	 */
	public getExpirationDateByJwtStandard(expiresIn: string | number) {
		let arg1 = 0;
		let arg2: DurationInputArg2 = undefined;

		if (typeof expiresIn === 'number') {
			arg1 = expiresIn;
		} else {
			arg1 = Number(expiresIn.replace(/[^0-9]/g, ''));
			arg2 = expiresIn.replace(/[0-9]/g, '') as DurationInputArg2;
		}

		return moment()
			.add(arg1, arg2)
			.toDate();
	}
}
