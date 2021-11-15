import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CryptoCurrency} from '../models';
import {CryptoCurrencyRepository} from '../repositories';

export class CryptoCurrencyController {
  constructor(
    @repository(CryptoCurrencyRepository)
    public cryptoCurrencyRepository : CryptoCurrencyRepository,
  ) {}

  @post('/crypto-currencies')
  @response(200, {
    description: 'CryptoCurrency model instance',
    content: {'application/json': {schema: getModelSchemaRef(CryptoCurrency)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CryptoCurrency, {
            title: 'NewCryptoCurrency',
            exclude: ['id'],
          }),
        },
      },
    })
    cryptoCurrency: Omit<CryptoCurrency, 'id'>,
  ): Promise<CryptoCurrency> {
    return this.cryptoCurrencyRepository.create(cryptoCurrency);
  }

  @get('/crypto-currencies/count')
  @response(200, {
    description: 'CryptoCurrency model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CryptoCurrency) where?: Where<CryptoCurrency>,
  ): Promise<Count> {
    return this.cryptoCurrencyRepository.count(where);
  }

  @get('/crypto-currencies')
  @response(200, {
    description: 'Array of CryptoCurrency model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CryptoCurrency, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CryptoCurrency) filter?: Filter<CryptoCurrency>,
  ): Promise<CryptoCurrency[]> {
    return this.cryptoCurrencyRepository.find(filter);
  }

  @patch('/crypto-currencies')
  @response(200, {
    description: 'CryptoCurrency PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CryptoCurrency, {partial: true}),
        },
      },
    })
    cryptoCurrency: CryptoCurrency,
    @param.where(CryptoCurrency) where?: Where<CryptoCurrency>,
  ): Promise<Count> {
    return this.cryptoCurrencyRepository.updateAll(cryptoCurrency, where);
  }

  @get('/crypto-currencies/{id}')
  @response(200, {
    description: 'CryptoCurrency model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CryptoCurrency, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CryptoCurrency, {exclude: 'where'}) filter?: FilterExcludingWhere<CryptoCurrency>
  ): Promise<CryptoCurrency> {
    return this.cryptoCurrencyRepository.findById(id, filter);
  }

  @patch('/crypto-currencies/{id}')
  @response(204, {
    description: 'CryptoCurrency PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CryptoCurrency, {partial: true}),
        },
      },
    })
    cryptoCurrency: CryptoCurrency,
  ): Promise<void> {
    await this.cryptoCurrencyRepository.updateById(id, cryptoCurrency);
  }

  @put('/crypto-currencies/{id}')
  @response(204, {
    description: 'CryptoCurrency PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cryptoCurrency: CryptoCurrency,
  ): Promise<void> {
    await this.cryptoCurrencyRepository.replaceById(id, cryptoCurrency);
  }

  @del('/crypto-currencies/{id}')
  @response(204, {
    description: 'CryptoCurrency DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cryptoCurrencyRepository.deleteById(id);
  }
}
