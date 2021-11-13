import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'number',
    required: true,
  })
  exchange_id: number;

  @property({
    type: 'number',
    required: true,
  })
  currency_from_id: number;

  @property({
    type: 'number',
    required: true,
  })
  currency_to_id: number;

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
