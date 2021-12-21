import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {User, UserRelations, CryptoCurrency, Exchange} from '../models';
import {CryptoCurrencyRepository} from './crypto-currency.repository';
import {ExchangeRepository} from './exchange.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly cryptoCurrencies: HasManyRepositoryFactory<CryptoCurrency, typeof User.prototype.id>;

  public readonly exchanges: HasManyRepositoryFactory<Exchange, typeof User.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('CryptoCurrencyRepository') protected cryptoCurrencyRepositoryGetter: Getter<CryptoCurrencyRepository>, @repository.getter('ExchangeRepository') protected exchangeRepositoryGetter: Getter<ExchangeRepository>,
  ) {
    super(User, dataSource);
    this.exchanges = this.createHasManyRepositoryFactoryFor('exchanges', exchangeRepositoryGetter,);
    this.registerInclusionResolver('exchanges', this.exchanges.inclusionResolver);
    this.cryptoCurrencies = this.createHasManyRepositoryFactoryFor('cryptoCurrencies', cryptoCurrencyRepositoryGetter,);
    this.registerInclusionResolver('cryptoCurrencies', this.cryptoCurrencies.inclusionResolver);
  }
}
