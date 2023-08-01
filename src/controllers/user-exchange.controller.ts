import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Exchange, User
} from '../models';
import {UserRepository} from '../repositories';

@authenticate('jwt')
export class UserExchangeController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/exchanges', {
    responses: {
      '200': {
        description: 'Array of User has many Exchange',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Exchange)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Exchange>,
  ): Promise<Exchange[]> {
    return this.userRepository.exchanges(id).find(filter);
  }

  @post('/users/{id}/exchanges', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Exchange)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exchange, {
            title: 'NewExchangeInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) exchange: Omit<Exchange, 'id'>,
  ): Promise<Exchange> {
    return this.userRepository.exchanges(id).create(exchange);
  }

  @patch('/users/{id}/exchanges', {
    responses: {
      '200': {
        description: 'User.Exchange PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exchange, {partial: true}),
        },
      },
    })
    exchange: Partial<Exchange>,
    @param.query.object('where', getWhereSchemaFor(Exchange)) where?: Where<Exchange>,
  ): Promise<Count> {
    return this.userRepository.exchanges(id).patch(exchange, where);
  }

  @del('/users/{id}/exchanges', {
    responses: {
      '200': {
        description: 'User.Exchange DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Exchange)) where?: Where<Exchange>,
  ): Promise<Count> {
    return this.userRepository.exchanges(id).delete(where);
  }
}
