import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Exchange, Trade
} from '../models';
import {TradeRepository} from '../repositories';

@authenticate('jwt')
export class TradeExchangeController {
  constructor(
    @repository(TradeRepository)
    public tradeRepository: TradeRepository,
  ) { }

  @get('/trades/{id}/exchange', {
    responses: {
      '200': {
        description: 'Exchange belonging to Trade',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Exchange)},
          },
        },
      },
    },
  })
  async getExchange(
    @param.path.number('id') id: typeof Trade.prototype.id,
  ): Promise<Exchange> {
    return this.tradeRepository.trade_exchange(id);
  }
}
