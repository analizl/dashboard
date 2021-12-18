import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Trade} from './trade.model';

@model({settings: {strict: false}})
export class Price extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;
  @property({
    type: 'number',
    mysql: {
      dataType: 'float',
      precision: 20,
      scale: 8
    },
    required: true,
  })
  price: number;

  @belongsTo(() => Trade, {name: 'price_trade'})
  trade_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Price>) {
    super(data);
  }
}

export interface PriceRelations {
  // describe navigational properties here
}

export type PriceWithRelations = Price & PriceRelations;
