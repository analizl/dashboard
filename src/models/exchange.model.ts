import {Entity, model, property, hasMany} from '@loopback/repository';
import {Trade} from './trade.model';

@model({settings: {strict: false}})
export class Exchange extends Entity {
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
  script: string;

  @hasMany(() => Trade)
  trades: Trade[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Exchange>) {
    super(data);
  }
}

export interface ExchangeRelations {
  // describe navigational properties here
}

export type ExchangeWithRelations = Exchange & ExchangeRelations;
