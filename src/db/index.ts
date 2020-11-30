import * as mongoose from 'mongoose';

export const dbConnection = mongoose.createConnection(process.env.DB_URI as string, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

