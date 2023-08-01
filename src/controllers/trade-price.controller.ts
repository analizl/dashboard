import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Price, Trade
} from '../models';
import {TradeRepository} from '../repositories';

@authenticate('jwt')
export class TradePriceController {
  constructor(
    @repository(TradeRepository) protected tradeRepository: TradeRepository,
  ) { }

  @get('/trades/{id}/prices', {
    responses: {
      '200': {
        description: 'Array of Trade has many Price',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Price)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Price>,
  ): Promise<Price[]> {
    return this.tradeRepository.prices(id).find(filter);
  }

  @get('//trades/{id}/prices/{range}', {
    responses: {
      '200': {
        description: 'Array of Trade has many Price in Range',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Price)},
          },
        },
      },
    }
  })
  async findByRange(
    @param.path.number('id') id: number,
    @param.path.number('range') range: number,
    @param.query.object('filter') filter?: Filter<Price>,
  ): Promise<Price[]> {
    let ahora = new Date()
    let ini = new Date()
    if (range == 1) {
      let aux = (ahora.getHours()) - 1
      //verificar si es el principio de un día
      ini.setHours(aux)
    } else {
      if (range == 4) {
        let aux = (ahora.getHours()) - 4
        //verificar si es el principio de un dia
        ini.setHours(aux)
      } else {
        if (range == 24) {
          let aux = (ahora.getDate()) - 1
          //
          ini.setDate(aux)
        } else {
          if (range == 7) {
            //
            let aux = (ahora.getDate()) - 7
            ini.setDate(aux)
          } else {
            if (range == 30) {
              //
              let aux = (ahora.getMonth()) - 1
              ini.setDate(aux)
            } else {
              if (range == 365) {
                //
                let aux = (ahora.getFullYear()) - 1
                ini.setFullYear(aux)
              }
            }
          }
        }
      }
    }
    return this.tradeRepository.prices(id).find({
      where: {and: [{date: {gt: ini}}, {date: {lt: ahora}}]}
    });
  }

  @post('/trades/{id}/prices', {
    responses: {
      '200': {
        description: 'Trade model instance',
        content: {'application/json': {schema: getModelSchemaRef(Price)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Trade.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {
            title: 'NewPriceInTrade',
            exclude: ['id'],
            optional: ['trade_id']
          }),
        },
      },
    }) price: Omit<Price, 'id'>,
  ): Promise<Price> {
    return this.tradeRepository.prices(id).create(price);
  }

  @patch('/trades/{id}/prices', {
    responses: {
      '200': {
        description: 'Trade.Price PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {partial: true}),
        },
      },
    })
    price: Partial<Price>,
    @param.query.object('where', getWhereSchemaFor(Price)) where?: Where<Price>,
  ): Promise<Count> {
    return this.tradeRepository.prices(id).patch(price, where);
  }

  @del('/trades/{id}/prices', {
    responses: {
      '200': {
        description: 'Trade.Price DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Price)) where?: Where<Price>,
  ): Promise<Count> {
    return this.tradeRepository.prices(id).delete(where);
  }
}
