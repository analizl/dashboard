import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Price,
  Trade
} from '../models';
import {PriceRepository} from '../repositories';

@authenticate('jwt')
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
