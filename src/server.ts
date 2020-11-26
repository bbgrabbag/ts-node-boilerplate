import * as express from 'express';
import { Test } from './db';

export const server = express();

server.use(express.json());

server.post('/docs', async (req, res) => {
    const saved = await new Test(req.body).save();
    res.status(201).send(saved);
});

server.get('/docs', async (req, res) => {
    const tests = await Test.find();
    res.status(200).send(tests);
});

server.get('/', (req, res) => {
    res.send({ message: 'hello world!' });
});
