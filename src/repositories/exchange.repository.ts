import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Exchange, ExchangeRelations, Trade, User} from '../models';
import {TradeRepository} from './trade.repository';
import {UserRepository} from './user.repository';

export class ExchangeRepository extends DefaultCrudRepository<
  Exchange,
  typeof Exchange.prototype.id,
  ExchangeRelations
> {

  public readonly trades: HasManyRepositoryFactory<Trade, typeof Exchange.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Exchange.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('TradeRepository') protected tradeRepositoryGetter: Getter<TradeRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Exchange, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.trades = this.createHasManyRepositoryFactoryFor('trades', tradeRepositoryGetter,);
  }
}
