import { FilterQuery, Model } from 'mongoose';
import { BaseDocument } from '../document/base.document';
import { SimpleCrudServiceInterface } from './simple-crud.service.interface';

export abstract class SimpleCrudService<D extends BaseDocument>
	implements SimpleCrudServiceInterface<D> {
	constructor(protected readonly model: Model<D>) {}

	public async getAll(conditions?: FilterQuery<D>) {
		return this.model.find({ ...conditions }).exec();
	}

	public async getById(id: string) {
		return this.model.findById(id).exec();
	}

	public async create(data: Partial<D>) {
		const created = new this.model(data);
		return created.save();
	}

	public async updateById(id: string, data: Partial<D>) {
		const find = await this.getById(id);

		if (!find) {
			throw new Error('Document not found');
		}

		const { _id } = find;

		const updated = await this.model.updateOne({ _id }, { ...find, ...data });
		return updated;
	}

	public async deleteById(id: string) {
		const find = await this.getById(id);

		if (!find) {
			throw new Error('Document not found');
		}

		const { _id } = find;

		await this.model.deleteOne({ _id });
		return _id;
	}
}
