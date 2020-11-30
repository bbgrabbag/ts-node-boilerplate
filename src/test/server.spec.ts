
import {
    createE2ETestBed
} from './util';

import * as st from 'supertest';
import { dbConnection } from '../db';
import { server } from '../server';

const testBed = createE2ETestBed(dbConnection, server, process.env.PORT as string);

describe('Server', () => {
    beforeAll(async () => {
        await testBed.runTestEnvironment();
    });

    afterEach(async () => {
        await testBed.dropTestDB();
    });

    afterAll(async () => {
        await testBed.closeTestEnvironment();
    });

    it('Should initialize and run', async () => {
        expect.assertions(2);
        const res = await st(server).get('/ping');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'pong' });
    });

    it('Should catch unfound requests', async () => {
        expect.assertions(2);
        const res = await st(server).get('/invalid');
        expect(res.status).toBe(404);
        expect((res.error as Error).message).toBe('cannot GET /invalid (404)');
    });


    it('Should fetch all example documents', async () => {
        expect.assertions(2);
        const res = await st(server).get('/api/examples');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('Should create an example document', async () => {
        expect.assertions(3);
        const res = await st(server).post('/api/examples').send({ name: 'test' });
        expect(res.status).toBe(201);
        expect(res.body.name).toEqual('test');
        expect(res.body._id).toBeTruthy();
    });
});