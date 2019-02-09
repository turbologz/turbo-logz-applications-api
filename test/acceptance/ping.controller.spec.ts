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

  it('invokes GET /ping', async () => {
    const res = await client.get('/ping?msg=world').expect(200);
    expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
