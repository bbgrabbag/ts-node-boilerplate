import { server } from '../server';
import { db } from '../db';
import http from 'http';

export const runTestServer = async (): Promise<http.Server> => {
    return new Promise<http.Server>((res, rej) => {
        db.on('connected', () => {
            const http = server.listen(process.env.PORT);
            res(http);
        });
        db.on('error', () => rej('there was a problem connecting to the test DB'));
    })
        .catch(err => { throw err; });
};

export const dropTestDB = (): Promise<void> => db.dropDatabase();
export const closeServer = (httpInstance: http.Server): Promise<void> => {
    httpInstance.close();
    return db.close();
};