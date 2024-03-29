import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

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

  @belongsTo(() => User)
  userId: number;
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
