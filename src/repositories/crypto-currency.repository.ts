import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {CryptoCurrency, CryptoCurrencyRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class CryptoCurrencyRepository extends DefaultCrudRepository<
  CryptoCurrency,
  typeof CryptoCurrency.prototype.id,
  CryptoCurrencyRelations
> {

  public readonly user: BelongsToAccessor<User, typeof CryptoCurrency.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(CryptoCurrency, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
