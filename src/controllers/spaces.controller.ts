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
import {Space} from '../models';
import {SpaceRepository} from '../repositories';

export class SpacesController {
  constructor(
    @repository(SpaceRepository)
    public spaceRepository : SpaceRepository,
  ) {}

  @post('/spaces', {
    responses: {
      '200': {
        description: 'Space model instance',
        content: {'application/json': {schema: {'x-ts-type': Space}}},
      },
    },
  })
  async create(@requestBody() space: Space): Promise<Space> {
    return await this.spaceRepository.create(space);
  }

  @get('/spaces/count', {
    responses: {
      '200': {
        description: 'Space model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Space)) where?: Where,
  ): Promise<Count> {
    return await this.spaceRepository.count(where);
  }

  @get('/spaces', {
    responses: {
      '200': {
        description: 'Array of Space model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Space}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Space)) filter?: Filter,
  ): Promise<Space[]> {
    return await this.spaceRepository.find(filter);
  }

  @patch('/spaces', {
    responses: {
      '200': {
        description: 'Space PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() space: Space,
    @param.query.object('where', getWhereSchemaFor(Space)) where?: Where,
  ): Promise<Count> {
    return await this.spaceRepository.updateAll(space, where);
  }

  @get('/spaces/{id}', {
    responses: {
      '200': {
        description: 'Space model instance',
        content: {'application/json': {schema: {'x-ts-type': Space}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Space> {
    return await this.spaceRepository.findById(id);
  }

  @patch('/spaces/{id}', {
    responses: {
      '204': {
        description: 'Space PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() space: Space,
  ): Promise<void> {
    await this.spaceRepository.updateById(id, space);
  }

  @put('/spaces/{id}', {
    responses: {
      '204': {
        description: 'Space PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() space: Space,
  ): Promise<void> {
    await this.spaceRepository.replaceById(id, space);
  }

  @del('/spaces/{id}', {
    responses: {
      '204': {
        description: 'Space DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.spaceRepository.deleteById(id);
  }
}
