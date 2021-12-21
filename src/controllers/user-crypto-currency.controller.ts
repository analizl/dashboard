import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  CryptoCurrency,
} from '../models';
import {UserRepository} from '../repositories';

export class UserCryptoCurrencyController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/crypto-currencies', {
    responses: {
      '200': {
        description: 'Array of User has many CryptoCurrency',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CryptoCurrency)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CryptoCurrency>,
  ): Promise<CryptoCurrency[]> {
    return this.userRepository.cryptoCurrencies(id).find(filter);
  }

  @post('/users/{id}/crypto-currencies', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(CryptoCurrency)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CryptoCurrency, {
            title: 'NewCryptoCurrencyInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) cryptoCurrency: Omit<CryptoCurrency, 'id'>,
  ): Promise<CryptoCurrency> {
    return this.userRepository.cryptoCurrencies(id).create(cryptoCurrency);
  }

  @patch('/users/{id}/crypto-currencies', {
    responses: {
      '200': {
        description: 'User.CryptoCurrency PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CryptoCurrency, {partial: true}),
        },
      },
    })
    cryptoCurrency: Partial<CryptoCurrency>,
    @param.query.object('where', getWhereSchemaFor(CryptoCurrency)) where?: Where<CryptoCurrency>,
  ): Promise<Count> {
    return this.userRepository.cryptoCurrencies(id).patch(cryptoCurrency, where);
  }

  @del('/users/{id}/crypto-currencies', {
    responses: {
      '200': {
        description: 'User.CryptoCurrency DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CryptoCurrency)) where?: Where<CryptoCurrency>,
  ): Promise<Count> {
    return this.userRepository.cryptoCurrencies(id).delete(where);
  }
}
