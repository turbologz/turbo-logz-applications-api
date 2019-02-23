import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Org} from '../models';
import {OrgRepository} from '../repositories';

export class OrgController {
  constructor(
    @repository(OrgRepository)
    public orgRepository : OrgRepository,
  ) {}

  @post('/orgs', {
    responses: {
      '200': {
        description: 'Org model instance',
        content: {'application/json': {schema: {'x-ts-type': Org}}},
      },
    },
  })
  async create(@requestBody() org: Org): Promise<Org> {
    return await this.orgRepository.create(org);
  }

  @get('/orgs/count', {
    responses: {
      '200': {
        description: 'Org model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Org)) where?: Where,
  ): Promise<Count> {
    return await this.orgRepository.count(where);
  }

  @get('/orgs', {
    responses: {
      '200': {
        description: 'Array of Org model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Org}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Org)) filter?: Filter,
  ): Promise<Org[]> {
    return await this.orgRepository.find(filter);
  }

  @patch('/orgs', {
    responses: {
      '200': {
        description: 'Org PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() org: Org,
    @param.query.object('where', getWhereSchemaFor(Org)) where?: Where,
  ): Promise<Count> {
    return await this.orgRepository.updateAll(org, where);
  }

  @get('/orgs/{id}', {
    responses: {
      '200': {
        description: 'Org model instance',
        content: {'application/json': {schema: {'x-ts-type': Org}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Org> {
    return await this.orgRepository.findById(id);
  }

  @patch('/orgs/{id}', {
    responses: {
      '204': {
        description: 'Org PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() org: Org,
  ): Promise<void> {
    await this.orgRepository.updateById(id, org);
  }

  @put('/orgs/{id}', {
    responses: {
      '204': {
        description: 'Org PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() org: Org,
  ): Promise<void> {
    await this.orgRepository.replaceById(id, org);
  }

  @del('/orgs/{id}', {
    responses: {
      '204': {
        description: 'Org DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orgRepository.deleteById(id);
  }
}
