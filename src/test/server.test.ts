import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/test.env' });

import * as st from 'supertest';
import { runTestServer, closeServer, dropTestDB } from './util';
import { server } from '../server';
import * as http from 'http';

describe('Server', () => {
    let http: http.Server;
    beforeAll(async () => {
        const serverInstance = await runTestServer();
        http = serverInstance;
    });

    afterEach(async () => {
        await dropTestDB();
    });

    afterAll(async () => {
        await closeServer(http);
    });

    it('Should initialize and run', async () => {
        expect.assertions(2);
        const res = await st(server).get('/');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'hello world!' });
    });

    it('Should fetch all documents', async () => {
        expect.assertions(2);
        const res = await st(server).get('/docs');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('Should create a document', async () => {
        expect.assertions(3);
        const res = await st(server).post('/docs').send({ name: 'test' });
        expect(res.status).toBe(201);
        expect(res.body.name).toEqual('test');
        expect(res.body._id).toBeTruthy();
    });
});