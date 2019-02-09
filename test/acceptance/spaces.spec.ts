import {Client, expect} from '@loopback/testlab';
import {TurboLogzApplicationsApiApplication} from '../..';
import {Container, setupApplication, startCassandraContainer} from '../test-helper';

describe('Spaces', () => {
    let app: TurboLogzApplicationsApiApplication;
    let client: Client;
    let cassandra: Container;

    before('setupApplication', async () => {
        cassandra = await startCassandraContainer();
        ({app, client} = await setupApplication());
    });

    after(async () => {
        await cassandra.stop();
        await app.stop();
    });

    it('should create a new space instance', async () => {
        const res = await client.post('/spaces',).send({name: 'testName'}).expect(200);

        expect(res.body).to.containEql({name: 'testName'});
    });
});
