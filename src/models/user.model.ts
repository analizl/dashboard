import {Entity, model, property, hasMany} from '@loopback/repository';
import {CryptoCurrency} from './crypto-currency.model';
import {Exchange} from './exchange.model';

@model()
export class User extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => CryptoCurrency)
  cryptoCurrencies: CryptoCurrency[];

  @hasMany(() => Exchange)
  exchanges: Exchange[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
