import { Client, expect } from '@loopback/testlab';
import { TurboLogzApplicationsApiApplication } from '../..';
import { Container, setupApplication, startCassandraContainer } from '../test-helper';

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
        await client.post('/spaces',).send({name: 'space1', orgId: 'test-org1'}).expect(200);
        await client.post('/spaces',).send({name: 'space2', orgId: 'test-org1'}).expect(200);
        await client.post('/spaces',).send({name: 'space3', orgId: 'test-org2'}).expect(200);
        await client.post('/spaces',).send({name: 'space4', orgId: 'test-org2'}).expect(200);

        const res = await client.get(`/spaces?filter=${JSON.stringify({where: {orgId: 'test-org1'}})}`).expect(200);

        expect(res.body.length).to.eql(2);
    });

    it('should only allow one space of the same name in an organization', async () => {
        const space1 = await client.post('/spaces',).send({name: 'spaceNew1', orgId: 'test-org1'}).expect(200);
        const space2 = await client.post('/spaces',).send({name: 'spaceNew1', orgId: 'test-org1'}).expect(200);
        const space3 = await client.post('/spaces',).send({name: 'spaceNew1', orgId: 'test-org1'}).expect(200);
        const space4 = await client.post('/spaces',).send({name: 'spaceNew4', orgId: 'test-org2'}).expect(200);
        const space5 = await client.post('/spaces',).send({name: 'spaceNew4', orgId: 'test-org3'}).expect(200);

        expect(space1.body.id).to.equal(space2.body.id);
        expect(space3.body.id).to.equal(space1.body.id);

        expect(space4.body.id).not.to.equal(space1.body.id);
        expect(space5.body.id).not.to.equal(space4.body.id);
    });
});
