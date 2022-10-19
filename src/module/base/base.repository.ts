import { model, Schema, connection } from "mongoose";
export default class BaseRepository<T> {
  _model;
  constructor(name, schema) {
    this._model = model<T>(name, schema);
  }
  create(data): Promise<T> {
    return this._model.create(data);
  }

  getAllDocument(filter): Promise<T[]> {
    return this._model.find(filter).sort({ _id: -1 }).exec();
  }

  updateDocument(query, dataUpdate, options?): Promise<any> {
    return this._model.updateOne(query, dataUpdate, options);
  }

  removeDocument(
    query
  ): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
    return this._model.remove(query).exec();
  }
  getOneDocument(query): Promise<T> {
    return this._model.findOne(query).exec();
  }

  getDocuments(filter, projection: any, options: any): Promise<T[]> {
    return this._model.find(filter, projection, options).exec();
  }
  getAggregate(aggregations: any): Promise<T[]> {
    return this._model.aggregate(aggregations).exec();
  }
  getDocumentById(id: string): Promise<T | null> {
    return this._model.findById(id);
  }

  countDocuments(filter): Promise<number> {
    return this._model.countDocuments(filter).exec();
  }

  findOne(query, projection?: any, options?) {
    return this._model.findOne(query, projection, options).exec();
  }
  find(query, projection?: any, options?) {
    return this._model.find(query, projection, options).lean();
  }
}
