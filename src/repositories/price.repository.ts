import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Price, PriceRelations, Trade} from '../models';
import {TradeRepository} from './trade.repository';

export class PriceRepository extends DefaultCrudRepository<
  Price,
  typeof Price.prototype.id,
  PriceRelations
> {

  public readonly price_trade: BelongsToAccessor<Trade, typeof Price.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('TradeRepository') protected tradeRepositoryGetter: Getter<TradeRepository>,
  ) {
    super(Price, dataSource);
    this.price_trade = this.createBelongsToAccessorFor('price_trade', tradeRepositoryGetter,);
    this.registerInclusionResolver('price_trade', this.price_trade.inclusionResolver);
  }
}
