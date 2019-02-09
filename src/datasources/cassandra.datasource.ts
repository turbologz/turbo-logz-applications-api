import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './cassandra.datasource.json';

export class CassandraDataSource extends juggler.DataSource {
    static dataSourceName = 'cassandra';

    constructor(
        @inject('datasources.config.cassandra', {optional: true})
            dsConfig: object = config,
    ) {
        super(dsConfig);
    }
}
