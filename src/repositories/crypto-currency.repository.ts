import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {CryptoCurrency, CryptoCurrencyRelations} from '../models';

export class CryptoCurrencyRepository extends DefaultCrudRepository<
  CryptoCurrency,
  typeof CryptoCurrency.prototype.id,
  CryptoCurrencyRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(CryptoCurrency, dataSource);
  }
}
