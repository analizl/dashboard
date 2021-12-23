import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Exchange,
  User,
} from '../models';
import {ExchangeRepository} from '../repositories';

export class ExchangeUserController {
  constructor(
    @repository(ExchangeRepository)
    public exchangeRepository: ExchangeRepository,
  ) { }

  @get('/exchanges/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Exchange',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Exchange.prototype.id,
  ): Promise<User> {
    return this.exchangeRepository.user(id);
  }
}
