import { Client, expect } from '@loopback/testlab';
import { TurboLogzApplicationsApiApplication } from '../..';
import { Container, setupApplication, startCassandraContainer } from '../test-helper';

describe('Orgs', () => {
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

    it('should create a new org instance', async () => {
        const res = await client.post('/orgs').send({name: 'org1'}).expect(200);

        expect(res.body).to.containEql({name: 'org1'});
    });

    it('should have only one instance of an org name', async () => {
        const org1 = await client.post('/orgs').send({name: 'newOrg'}).expect(200);
        const org2 = await client.post('/orgs').send({name: 'newOrg'}).expect(200);
        const org3 = await client.post('/orgs').send({name: 'newOrg'}).expect(200);
        const org4 = await client.post('/orgs').send({name: 'newOrgOther'}).expect(200);

        expect(org1.body.id).to.equal(org2.body.id);
        expect(org3.body.id).to.equal(org1.body.id);
        expect(org4.body.id).not.to.equal(org1.body.id);
    });
});
