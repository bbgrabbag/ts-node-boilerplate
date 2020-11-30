import * as express from 'express';
import { exampleService } from '../db/example.service';

export const apiRouter = express.Router();

apiRouter.route('/examples')
    .post(async (req, res) => {
        const saved = await exampleService.createExample(req.body);
        res.status(201).send(saved);
    })
    .get(async (req, res) => {
        const tests = await exampleService.getExamples();
        res.status(200).send(tests);
    });

