import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CryptoCurrency extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  symbol: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  wiki?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CryptoCurrency>) {
    super(data);
  }
}

export interface CryptoCurrencyRelations {
  // describe navigational properties here
}

export type CryptoCurrencyWithRelations = CryptoCurrency & CryptoCurrencyRelations;
