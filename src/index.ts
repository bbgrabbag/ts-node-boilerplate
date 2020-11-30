import * as dotenv from 'dotenv';
dotenv.config();

import { server } from './server';
import { dbConnection } from './db/';

dbConnection.on('connected', () => {
    server.listen(process.env.PORT, () => {
        console.log(`Server connected on port ${process.env.PORT}`);
        console.log(`Connected to DB: ${dbConnection.name}`);
    });
});
