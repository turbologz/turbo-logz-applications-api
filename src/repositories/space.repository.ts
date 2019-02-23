import {DefaultCrudRepository} from '@loopback/repository';
import {Space} from '../models';
import {CassandraDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SpaceRepository extends DefaultCrudRepository<Space, typeof Space.prototype.id> {
    constructor(
        @inject('datasources.cassandra') dataSource: CassandraDataSource,
    ) {
        super(Space, dataSource);
    }
}
