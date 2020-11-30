import * as http from 'http';
import * as mongoose from 'mongoose';

export const runTestDBFactory = (db: mongoose.Connection) => (): Promise<void> => new Promise((res, rej) => {
    db.on('connected', res);
    db.on('error', rej);
});

export const closeTestDBFactory = (db: mongoose.Connection) => (): Promise<void> => db.close();

export const dropTestDBFactory = (db: mongoose.Connection) => (): Promise<void> => db.dropDatabase();

export const dropTestCollectionsFactory = (db: mongoose.Connection) => (names: string[]): Promise<void[]> => Promise.all(names.map(name => db.dropCollection(name)));

export const runTestServerFactory = (server: http.Server, port: string) => (): Promise<void> => new Promise((res, rej) => {
    server.listen(port, res);
    server.on('error', rej);
});

export const closeTestServerFactory = (server: http.Server) => (): Promise<void> => new Promise((res, rej) => {
    server.close(err => err ? rej(err) : res());
});

export const runE2ETestEnvironmentFactory = (db: mongoose.Connection, server: http.Server, port: string) => async (): Promise<void> => {
    await runTestDBFactory(db)();
    await runTestServerFactory(server, port)();
};

export const closeE2ETestEnvironmentFactory = (db: mongoose.Connection, server: http.Server) => async (): Promise<void> => {
    await closeTestDBFactory(db)();
    await closeTestServerFactory(server)();
};

export const insertDocumentsFactory = (db: mongoose.Connection) => async <D>(collection: string, docs: D[]): Promise<void> => {
    await db.collection(collection).insertMany(docs);
};

export interface ITestBed {
    runTestEnvironment: () => Promise<void>,
    closeTestEnvironment: () => Promise<void>,
    dropTestDB: () => Promise<void>,
    dropTestCollections: (names: string[]) => Promise<void[]>,
    insertDocuments: <D>(collection: string, docs: D[]) => Promise<void>
}

export interface IE2ETestBed extends ITestBed {
    runTestServer: () => Promise<void>,
    closeTestServer: () => Promise<void>,
    runTestDB: () => Promise<void>,
    closeTestDB: () => Promise<void>,
}

export const createE2ETestBed = (
    db: mongoose.Connection,
    server: http.Server,
    port: string
): IE2ETestBed => ({
    runTestDB: runTestDBFactory(db),
    closeTestDB: closeTestDBFactory(db),
    dropTestDB: dropTestDBFactory(db),
    dropTestCollections: dropTestCollectionsFactory(db),
    runTestServer: runTestServerFactory(server, port),
    closeTestServer: closeTestServerFactory(server),
    runTestEnvironment: runE2ETestEnvironmentFactory(db, server, port),
    closeTestEnvironment: closeE2ETestEnvironmentFactory(db, server),
    insertDocuments: insertDocumentsFactory(db)
});

export const createUnitTestBed = (
    db: mongoose.Connection
): ITestBed => ({
    dropTestDB: dropTestDBFactory(db),
    dropTestCollections: dropTestCollectionsFactory(db),
    insertDocuments: insertDocumentsFactory(db),
    runTestEnvironment: runTestDBFactory(db),
    closeTestEnvironment: closeTestDBFactory(db)
});