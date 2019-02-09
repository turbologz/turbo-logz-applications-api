import {Client, expect} from '@loopback/testlab';
import {TurboLogzApplicationsApiApplication} from '../..';
import {Container, setupApplication, startCassandraContainer} from '../test-helper';

describe('PingController', () => {
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

    it('should create a new application instance', async () => {
        const res = await client.post('/apps',).send({appId: 'id1', name: 'app1'}).expect(200);

        expect(res.body).to.containEql({appId: 'id1', name: 'app1'});
    });
});
