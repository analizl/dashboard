import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Exchange} from './exchange.model';
import {CryptoCurrency} from './crypto-currency.model';
import {Price} from './price.model';

@model({settings: {strict: false}})
export class Trade extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  script: string;
  @belongsTo(() => Exchange, {name: 'trade_exchange'})
  exchange_id: number;

  @belongsTo(() => CryptoCurrency, {name: 'trade_currency_from'})
  currency_from_id: number;

  @belongsTo(() => CryptoCurrency, {name: 'trade_currency_to'})
  currency_to_id: number;

  @property({
    type: 'number',
  })
  exchangeId?: number;

  @hasMany(() => Price, {keyTo: 'trade_id'})
  prices: Price[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Trade>) {
    super(data);
  }
}

export interface TradeRelations {
  // describe navigational properties here
}

export type TradeWithRelations = Trade & TradeRelations;
