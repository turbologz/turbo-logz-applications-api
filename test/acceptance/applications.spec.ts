import { Client, expect } from '@loopback/testlab';
import { TurboLogzApplicationsApiApplication } from '../..';
import { Container, setupApplication, startCassandraContainer } from '../test-helper';

describe('Applications', () => {
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
        const res = await client.post('/apps',).send({spaceId: 'space1', appId: 'id1', name: 'app1'}).expect(200);

        expect(res.body).to.containEql({spaceId: 'space1', appId: 'id1', name: 'app1'});
    });

    it('should be able to get applications in a space', async () => {
        await client.post('/apps',).send({spaceId: 'space1', appId: 'id1', name: 'app1'}).expect(200);
        await client.post('/apps',).send({spaceId: 'space1', appId: 'id2', name: 'app2'}).expect(200);
        await client.post('/apps',).send({spaceId: 'space2', appId: 'id3', name: 'app3'}).expect(200);
        await client.post('/apps',).send({spaceId: 'space2', appId: 'id4', name: 'app4'}).expect(200);

        const res = await client.get(`/apps?filter=${JSON.stringify({where: {spaceId: 'space2'}})}`).expect(200);

        expect(res.body.length).to.eql(2);
    });

    it('should allow only one app of the same name in a space', async () => {
        const app1 = await client.post('/apps',).send({spaceId: 'space1', appId: 'id1', name: 'new-app1'}).expect(200);
        const app2 = await client.post('/apps',).send({spaceId: 'space1', appId: 'id2', name: 'new-app1'}).expect(200);
        const app3 = await client.post('/apps',).send({spaceId: 'space1', appId: 'id3', name: 'new-app1'}).expect(200);
        const app4 = await client.post('/apps',).send({spaceId: 'space2', appId: 'id4', name: 'new-app2'}).expect(200);
        const app5 = await client.post('/apps',).send({spaceId: 'space3', appId: 'id5', name: 'new-app2'}).expect(200);

        expect(app1.body.id).to.equal(app2.body.id);
        expect(app3.body.id).to.equal(app1.body.id);
        expect(app4.body.id).not.to.equal(app1.body.id);
        expect(app5.body.id).not.to.equal(app4.body.id);
    });
});
