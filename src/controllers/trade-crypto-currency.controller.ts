import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Trade,
  CryptoCurrency,
} from '../models';
import {TradeRepository} from '../repositories';

export class TradeCryptoCurrencyController {
  constructor(
    @repository(TradeRepository)
    public tradeRepository: TradeRepository,
  ) { }

  @get('/trades/{id}/crypto-currency', {
    responses: {
      '200': {
        description: 'CryptoCurrency belonging to Trade',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CryptoCurrency)},
          },
        },
      },
    },
  })
  async getCryptoCurrency(
    @param.path.number('id') id: typeof Trade.prototype.id,
  ): Promise<CryptoCurrency> {
    return this.tradeRepository.trade_currency_from(id);
  }
}
