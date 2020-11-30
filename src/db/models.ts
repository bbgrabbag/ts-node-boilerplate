import { buildRegistry } from './utils';
import { ExampleSchema } from './schemas';
import { IExampleEntity } from './entities';
import { dbConnection } from './';


export const connectRegistry = buildRegistry<{ example: IExampleEntity }>(
    { example: ExampleSchema }
);

export const registry = connectRegistry(dbConnection);