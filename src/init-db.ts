const {CASSANDRA_HOST, CASSANDRA_USERNAME, CASSANDRA_PASSWORD} = process.env;
const cassandra = require('cassandra-driver');

export async function initDB() {
    const PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;

    const client = new cassandra.Client({
        contactPoints: [CASSANDRA_HOST],
        localDataCenter: 'datacenter1',
        authProvider: new PlainTextAuthProvider(CASSANDRA_USERNAME, CASSANDRA_PASSWORD)
    });

    const query = 'CREATE KEYSPACE IF NOT EXISTS turbo_logz_applications WITH replication = {\'class\': \'SimpleStrategy\', \'replication_factor\': \'1\'} AND durable_writes = true;';

    await client.execute(query, []);

    client.shutdown();
}