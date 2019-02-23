import {DefaultCrudRepository} from '@loopback/repository';
import {App} from '../models';
import {CassandraDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AppRepository extends DefaultCrudRepository<App, typeof App.prototype.id> {
    constructor(
        @inject('datasources.cassandra') dataSource: CassandraDataSource,
    ) {
        super(App, dataSource);
    }
}
