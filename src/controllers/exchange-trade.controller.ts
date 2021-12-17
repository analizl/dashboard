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
  Exchange,
  Trade,
} from '../models';
import {ExchangeRepository} from '../repositories';

export class ExchangeTradeController {
  constructor(
    @repository(ExchangeRepository) protected exchangeRepository: ExchangeRepository,
  ) { }

  @get('/exchanges/{id}/trades', {
    responses: {
      '200': {
        description: 'Array of Exchange has many Trade',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Trade)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Trade>,
  ): Promise<Trade[]> {
    return this.exchangeRepository.trades(id).find(filter);
  }

  @post('/exchanges/{id}/trades', {
    responses: {
      '200': {
        description: 'Exchange model instance',
        content: {'application/json': {schema: getModelSchemaRef(Trade)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Exchange.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trade, {
            title: 'NewTradeInExchange',
            exclude: ['id'],
            optional: ['exchangeId']
          }),
        },
      },
    }) trade: Omit<Trade, 'id'>,
  ): Promise<Trade> {
    return this.exchangeRepository.trades(id).create(trade);
  }

  @patch('/exchanges/{id}/trades', {
    responses: {
      '200': {
        description: 'Exchange.Trade PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trade, {partial: true}),
        },
      },
    })
    trade: Partial<Trade>,
    @param.query.object('where', getWhereSchemaFor(Trade)) where?: Where<Trade>,
  ): Promise<Count> {
    return this.exchangeRepository.trades(id).patch(trade, where);
  }

  @del('/exchanges/{id}/trades', {
    responses: {
      '200': {
        description: 'Exchange.Trade DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Trade)) where?: Where<Trade>,
  ): Promise<Count> {
    return this.exchangeRepository.trades(id).delete(where);
  }
}
