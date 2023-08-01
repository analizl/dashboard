import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';
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
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

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
