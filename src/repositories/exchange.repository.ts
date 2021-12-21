import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Exchange, ExchangeRelations, Trade} from '../models';
import {TradeRepository} from './trade.repository';

export class ExchangeRepository extends DefaultCrudRepository<
  Exchange,
  typeof Exchange.prototype.id,
  ExchangeRelations
> {

  public readonly trades: HasManyRepositoryFactory<Trade, typeof Exchange.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('TradeRepository') protected tradeRepositoryGetter: Getter<TradeRepository>,
  ) {
    super(Exchange, dataSource);
    this.trades = this.createHasManyRepositoryFactoryFor('trades', tradeRepositoryGetter,);
  }
}
