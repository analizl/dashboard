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
  Trade,
  Price,
} from '../models';
import {TradeRepository} from '../repositories';

export class TradePriceController {
  constructor(
    @repository(TradeRepository) protected tradeRepository: TradeRepository,
  ) { }

  @get('/trades/{id}/prices', {
    responses: {
      '200': {
        description: 'Array of Trade has many Price',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Price)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Price>,
  ): Promise<Price[]> {
    return this.tradeRepository.prices(id).find(filter);
  }

  @post('/trades/{id}/prices', {
    responses: {
      '200': {
        description: 'Trade model instance',
        content: {'application/json': {schema: getModelSchemaRef(Price)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Trade.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {
            title: 'NewPriceInTrade',
            exclude: ['id'],
            optional: ['trade_id']
          }),
        },
      },
    }) price: Omit<Price, 'id'>,
  ): Promise<Price> {
    return this.tradeRepository.prices(id).create(price);
  }

  @patch('/trades/{id}/prices', {
    responses: {
      '200': {
        description: 'Trade.Price PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {partial: true}),
        },
      },
    })
    price: Partial<Price>,
    @param.query.object('where', getWhereSchemaFor(Price)) where?: Where<Price>,
  ): Promise<Count> {
    return this.tradeRepository.prices(id).patch(price, where);
  }

  @del('/trades/{id}/prices', {
    responses: {
      '200': {
        description: 'Trade.Price DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Price)) where?: Where<Price>,
  ): Promise<Count> {
    return this.tradeRepository.prices(id).delete(where);
  }
}
