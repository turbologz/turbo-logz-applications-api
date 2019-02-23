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
        const res = await client.post('/spaces',).send({orgId: 'org1', name: 'testName'}).expect(200);

        expect(res.body).to.containEql({name: 'testName'});
    });

    it('should be able to get spaces in a org', async () => {
        await client.post('/spaces',).send({name: 'space1', orgId: 'org1'}).expect(200);
        await client.post('/spaces',).send({name: 'space2', orgId: 'org1'}).expect(200);
        await client.post('/spaces',).send({name: 'space3', orgId: 'org2'}).expect(200);
        await client.post('/spaces',).send({name: 'space4', orgId: 'org2'}).expect(200);

        const res = await client.get(`/spaces?filter=${JSON.stringify({where: {orgId: 'org1'}})}`).expect(200);

        expect(res.body.length).to.eql(2);
    });
});
