import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CryptoCurrency,
  User,
} from '../models';
import {CryptoCurrencyRepository} from '../repositories';

export class CryptoCurrencyUserController {
  constructor(
    @repository(CryptoCurrencyRepository)
    public cryptoCurrencyRepository: CryptoCurrencyRepository,
  ) { }

  @get('/crypto-currencies/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to CryptoCurrency',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof CryptoCurrency.prototype.id,
  ): Promise<User> {
    return this.cryptoCurrencyRepository.user(id);
  }
}
