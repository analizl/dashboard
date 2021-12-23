import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {User, UserCredentials, UserRelations, CryptoCurrency} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';
import {CryptoCurrencyRepository} from './crypto-currency.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;

  public readonly cryptoCurrencies: HasManyRepositoryFactory<CryptoCurrency, typeof User.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('UserCredentialsRepository') protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>, @repository.getter('CryptoCurrencyRepository') protected cryptoCurrencyRepositoryGetter: Getter<CryptoCurrencyRepository>,
  ) {
    super(User, dataSource);
    this.cryptoCurrencies = this.createHasManyRepositoryFactoryFor('cryptoCurrencies', cryptoCurrencyRepositoryGetter,);
    this.registerInclusionResolver('cryptoCurrencies', this.cryptoCurrencies.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);

  }
  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
