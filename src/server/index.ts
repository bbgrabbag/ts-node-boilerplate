import * as express from 'express';
import * as http from 'http';
import { apiRouter } from './api.router';

export const app = express();
export const server = http.createServer(app);

app.use(express.json());
app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
    res.send({ message: 'pong' });
});
