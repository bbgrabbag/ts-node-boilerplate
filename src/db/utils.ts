import * as mongoose from 'mongoose';

export type CustomDocument<E> = mongoose.Document & E;

export const modelFactory = (db: mongoose.Connection) => <E>(name: string, schema: mongoose.Schema<E>): mongoose.Model<CustomDocument<E>> => db.model<CustomDocument<E>>(name, schema);

export type ModelRegistry<S, E> = Record<keyof S, mongoose.Model<CustomDocument<E[keyof E]>>>;

export type CreateService<S, E> = <O>(cb: (models: ModelRegistry<S, E>) => O) => O

export type ServiceRegistry<S, E> = {
    models: ModelRegistry<S, E>;
    createService: CreateService<S, E>
}

export const buildRegistry = <E>(
    schemas: Record<keyof E, mongoose.Schema>,
) => (db: mongoose.Connection = mongoose.connection): ServiceRegistry<typeof schemas, E> => {
    const models = {} as ModelRegistry<typeof schemas, E>;
    for (const key in schemas) {
        models[key] = modelFactory(db)<E[keyof E]>(key, schemas[key]);
    }
    return {
        models,
        createService: cb => cb(models)
    };
};