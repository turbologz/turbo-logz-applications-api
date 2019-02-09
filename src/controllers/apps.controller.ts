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
import {App} from '../models';
import {AppRepository} from '../repositories';

export class AppsController {
    constructor(
        @repository(AppRepository)
        public appRepository: AppRepository,
    ) {
    }

    @post('/apps', {
        responses: {
            '200': {
                description: 'App model instance',
                content: {'application/json': {schema: {'x-ts-type': App}}},
            },
        },
    })
    async create(@requestBody() app: App): Promise<App> {
        return await this.appRepository.create(app);
    }

    @get('/apps/count', {
        responses: {
            '200': {
                description: 'App model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.query.object('where', getWhereSchemaFor(App)) where?: Where,
    ): Promise<Count> {
        return await this.appRepository.count(where);
    }

    @get('/apps', {
        responses: {
            '200': {
                description: 'Array of App model instances',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: {'x-ts-type': App}},
                    },
                },
            },
        },
    })
    async find(
        @param.query.object('filter', getFilterSchemaFor(App)) filter?: Filter,
    ): Promise<App[]> {
        return await this.appRepository.find(filter);
    }

    @patch('/apps', {
        responses: {
            '200': {
                description: 'App PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody() app: App,
        @param.query.object('where', getWhereSchemaFor(App)) where?: Where,
    ): Promise<Count> {
        return await this.appRepository.updateAll(app, where);
    }

    @get('/apps/{id}', {
        responses: {
            '200': {
                description: 'App model instance',
                content: {'application/json': {schema: {'x-ts-type': App}}},
            },
        },
    })
    async findById(@param.path.string('id') id: string): Promise<App> {
        return await this.appRepository.findById(id);
    }

    @patch('/apps/{id}', {
        responses: {
            '204': {
                description: 'App PATCH success',
            },
        },
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody() app: App,
    ): Promise<void> {
        await this.appRepository.updateById(id, app);
    }

    @put('/apps/{id}', {
        responses: {
            '204': {
                description: 'App PUT success',
            },
        },
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() app: App,
    ): Promise<void> {
        await this.appRepository.replaceById(id, app);
    }

    @del('/apps/{id}', {
        responses: {
            '204': {
                description: 'App DELETE success',
            },
        },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.appRepository.deleteById(id);
    }
}
