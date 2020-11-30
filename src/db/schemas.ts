import * as mongoose from 'mongoose';
import { IExampleEntity } from './entities';

export const ExampleSchema = new mongoose.Schema<IExampleEntity>({
    name: String
});