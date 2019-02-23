import {DefaultCrudRepository} from '@loopback/repository';
import {Org} from '../models';
import {inject} from '@loopback/core';
import {CassandraDataSource} from "../datasources";

export class OrgRepository extends DefaultCrudRepository<
  Org,
  typeof Org.prototype.id
> {
  constructor(
      @inject('datasources.cassandra') dataSource: CassandraDataSource,
  ) {
    super(Org, dataSource);
  }
}
