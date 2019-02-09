const {CASSANDRA_HOST, CASSANDRA_USERNAME, CASSANDRA_PASSWORD} = process.env;

export const config = {
    name: "cassandra",
    connector: "cassandra",
    host: CASSANDRA_HOST,
    port: 9042,
    user: CASSANDRA_USERNAME,
    password: CASSANDRA_PASSWORD,
    database: "turbo_logz_applications",
    connectTimeout: 10000,
    readTimeout: 10000
};