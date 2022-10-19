
import BaseRepository from "./base.repository.js";

interface Paginated<T> {
	total: number;
	limit: number;
	skip: number;
	data: T[];
}

export default class BaseService<T> { 
	repository: BaseRepository<T>;
	constructor(name, schema) {
		this.repository = new BaseRepository<T>(name, schema);
	}
	async _create(param): Promise<T> {
		
		return this.repository.create(param)
	}

	async _find(params): Promise<Paginated<T>> {
		params = {
			skip: 0,
			limit: 10,
			...params.query
		}

		const result:Paginated<T> = {
			...params,
			data: await this.repository.find(params, null, params),
			total:await this.repository.countDocuments(params)
		};
		return result;
	}

	async _get(id): Promise<T> {
		const result: T = await this.repository.getDocumentById(id);
		if (!result) {
			throw new Error()
		}
		return 
	}
	async _patch(id, param): Promise<T> {
		return await this.repository.updateDocument({_id: id}, param);
	}
}