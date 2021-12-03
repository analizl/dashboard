import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Price,
  Trade,
} from '../models';
import {PriceRepository} from '../repositories';

export class PriceTradeController {
  constructor(
    @repository(PriceRepository)
    public priceRepository: PriceRepository,
  ) { }

  @get('/prices/{id}/trade', {
    responses: {
      '200': {
        description: 'Trade belonging to Price',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Trade)},
          },
        },
      },
    },
  })
  async getTrade(
    @param.path.number('id') id: typeof Price.prototype.id,
  ): Promise<Trade> {
    return this.priceRepository.price_trade(id);
  }
}
