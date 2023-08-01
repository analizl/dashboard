import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Trade, TradeRelations, Exchange, CryptoCurrency, Price} from '../models';
import {ExchangeRepository} from './exchange.repository';
import {CryptoCurrencyRepository} from './crypto-currency.repository';
import {PriceRepository} from './price.repository';

export class TradeRepository extends DefaultCrudRepository<
  Trade,
  typeof Trade.prototype.id,
  TradeRelations
> {

  public readonly trade_exchange: BelongsToAccessor<Exchange, typeof Trade.prototype.id>;

  public readonly trade_currency_from: BelongsToAccessor<CryptoCurrency, typeof Trade.prototype.id>;

  public readonly trade_currency_to: BelongsToAccessor<CryptoCurrency, typeof Trade.prototype.id>;

  public readonly prices: HasManyRepositoryFactory<Price, typeof Trade.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('ExchangeRepository') protected exchangeRepositoryGetter: Getter<ExchangeRepository>, @repository.getter('CryptoCurrencyRepository') protected cryptoCurrencyRepositoryGetter: Getter<CryptoCurrencyRepository>, @repository.getter('PriceRepository') protected priceRepositoryGetter: Getter<PriceRepository>,
  ) {
    super(Trade, dataSource);
    this.prices = this.createHasManyRepositoryFactoryFor('prices', priceRepositoryGetter,);
    this.trade_currency_to = this.createBelongsToAccessorFor('trade_currency_to', cryptoCurrencyRepositoryGetter,);
    this.registerInclusionResolver('trade_currency_to', this.trade_currency_to.inclusionResolver);
    this.trade_currency_from = this.createBelongsToAccessorFor('trade_currency_from', cryptoCurrencyRepositoryGetter,);
    this.registerInclusionResolver('trade_currency_from', this.trade_currency_from.inclusionResolver);
    this.trade_exchange = this.createBelongsToAccessorFor('trade_exchange', exchangeRepositoryGetter,);
    this.registerInclusionResolver('trade_exchange', this.trade_exchange.inclusionResolver);
  }
}
