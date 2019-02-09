import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {config} from './cassandra.datasource.config';

export class CassandraDataSource extends juggler.DataSource {
    static dataSourceName = 'cassandra';

    constructor(
        @inject('datasources.config.cassandra', {optional: true})
            dsConfig: object = config,
    ) {
        super(dsConfig);
    }
}
