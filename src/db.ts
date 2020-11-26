import * as mongoose from 'mongoose';

export const db = mongoose.createConnection(process.env.DB_URI as string, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

export const Test = db.model('test', new mongoose.Schema({
    name: String
}));