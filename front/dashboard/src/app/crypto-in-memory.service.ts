import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Crypto } from './model/Crypto';

@Injectable({
  providedIn: 'root'
})
export class CryptoInMemoryService {

  constructor() {}

  cryptos = [
    new Crypto("Bitcoin", "BTC", "a description", "a wiki url"),
    new Crypto("Ethereum", "ETH", "a description", "a wiki url"),
    new Crypto("Otra crypto", "ABC", "a description", "a wiki url"),
  ];
    getCryptosList(){
      return this.cryptos
    }
    addCrypto(crypto:Crypto){
      this.cryptos.push(crypto)
    }
    deleteCrypto(crypto:Crypto){
      this.cryptos = this.cryptos.filter(c=>crypto!==c)
    }


}
