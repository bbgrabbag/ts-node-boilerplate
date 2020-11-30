
import {
    createUnitTestBed
} from '../test/util';


import { dbConnection } from '../db/';
import { exampleService } from './example.service';

const testBed = createUnitTestBed(dbConnection);

describe('Unit test Example Service', () => {
    beforeAll(async () => {
        await testBed.runTestEnvironment();
    });

    beforeEach(async () => {
        await testBed.insertDocuments('examples', [{ name: 'demo' }]);
    });

    afterEach(async () => {
        await testBed.dropTestCollections(['examples']);
    });

    afterAll(async () => {
        await testBed.closeTestEnvironment();
    });

    it('Should get all examples', async () => {
        expect.assertions(1);
        const examples = await exampleService.getExamples();
        expect(examples.length).toBe(1);
    });

    it('Should create an example', async () => {
        expect.assertions(1);
        const example = await exampleService.createExample({ name: 'created' });
        expect(example._id).toBeTruthy();

    });
});