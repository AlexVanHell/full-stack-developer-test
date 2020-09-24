import { FilterQuery } from 'mongoose';
import { BaseDocument } from '../document/base.document';

export interface SimpleCrudServiceInterface<D extends BaseDocument> {
	/**
	 * Get all items
	 */
	getAll(conditions?: FilterQuery<D>): Promise<D[]>;

	/**
	 * Get only one item by id
	 * @param id Object's id
	 */
	getById(id: string): Promise<D>;

	/**
	 * Create one item
	 * @param data Data for new object creation
	 */
	create(data: Partial<D>): Promise<D>;

	/**
	 * Update one item by id
	 * @param id Object's id
	 * @param data Data for partial or total object update
	 */
	updateById(id: string, data: Partial<D>): Promise<D>;

	/**
	 * Delete one item by id
	 * @param id Object's id
	 * @returns Deleted object id
	 */
	deleteById(id: string): Promise<string>;
}
