import { IExampleEntity } from './entities';
import { registry } from './models';
import { CustomDocument } from './utils';


export const exampleService = registry.createService(models => ({
    getExamples: async (): Promise<CustomDocument<IExampleEntity>[]> => {
        return await models.example.find();
    },
    createExample: async (example: IExampleEntity): Promise<CustomDocument<IExampleEntity>> => {
        const created = new models.example(example);
        return created.save();
    }
}));

