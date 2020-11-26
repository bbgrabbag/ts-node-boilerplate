import * as dotenv from 'dotenv';
dotenv.config();

import { server } from './server';
import { db } from './db';

db.on('connected', () => {
    server.listen(process.env.PORT, () => {
        console.log(`Server connected on port ${process.env.PORT}`);
        console.log(`Connected to DB: ${db.name}`);
    });
});
