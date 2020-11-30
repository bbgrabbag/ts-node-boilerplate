import * as dotenv from 'dotenv';
import * as path from 'path';

const initializeTestEnvironmentVariables = (filepath = __dirname, filename = 'test.env'): void => {
    dotenv.config({ path: path.resolve(filepath, filename) });
};

initializeTestEnvironmentVariables();

