import {TurboLogzApplicationsApiApplication} from '..';
import {
    createRestAppClient,
    givenHttpServerConfig,
    Client,
} from '@loopback/testlab';
import * as retry from 'async-retry';

const cassandra = require('cassandra-driver');
let {Docker} = require('node-docker-api');

export async function setupApplication(): Promise<AppWithClient> {
    const app = new TurboLogzApplicationsApiApplication({
        rest: givenHttpServerConfig(),
    });

    await app.boot();
    await app.initDB();
    await app.migrateSchema();
    await app.start();

    const client = createRestAppClient(app);

    return {app, client};
}

export interface Container {
    stop: Function;
    start: Function;
    status: Function;
}

export interface AppWithClient {
    app: TurboLogzApplicationsApiApplication;
    client: Client;
}

export async function startCassandraContainer(): Promise<Container> {
    const docker = new Docker({socketPath: '/var/run/docker.sock'});

    const container = await docker.container.create({
        Image: 'bitnami/cassandra:latest',
        host: '127.0.0.1',
        port: 9042,
        HostConfig: {
            PortBindings: {
                '9042/tcp': [
                    {
                        HostPort: '9042',
                    },
                ],
            },
        },
    });

    await container.start();

    await retry(async () => {
        console.log('Connecting to db');
        const PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;

        const client = new cassandra.Client({
            contactPoints: ['127.0.0.1'],
            localDataCenter: 'DC1',
            authProvider: new PlainTextAuthProvider('cassandra', 'cassandra')
        });

        const query = 'SELECT * FROM system_schema.keyspaces';

        await client.execute(query, []);

        client.shutdown();
    }, {
        retries: 20,
    });

    console.log('DB Created');


    return container;
}

