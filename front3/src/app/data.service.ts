import { Injectable } from '@angular/core';
import { Crypto } from './model/Crypto';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({  providedIn: 'root' })
export class DataServiceService {
  constructor(private http:HttpClient) {

  }
   cryptos = [
    new Crypto("Bitcoin", "BTC", "a description", "a wiki url"),
    new Crypto("Ethereum", "ETH", "a description", "a wiki url"),
    new Crypto("Otra crypto", "ABC", "a description", "a wiki url"),
  ];
  getCryptoList():Observable<any>{
    return this.http.get<Crypto[]>('http://localhost:3000/crypto-currencies',  {observe: 'body'})
  }
addCrypto(crypto:Crypto){
  return this.http.post('http://localhost:3000/crypto-currencies', crypto).subscribe()
}

updateCrypto(idx:String,crypto:Crypto){
  const body = {"name":crypto.name, "symbol":crypto.symbol, "description":crypto.description, "wiki":crypto.wiki}
  this.http.put('http://localhost:3000/crypto-currencies/'+idx, body).subscribe(data => {
      console.log("PUT Request is successful ", data);
    },
    error => {
      console.log("Error", error);
    })
}

  deleteCrypto(crypto:Crypto){
    return this.http.delete('http://localhost:3000/crypto-currencies/'+crypto.id ).subscribe()
  }

  getCrypto(id:String){
    return this.http.get<Crypto>('http://localhost:3000/crypto-currencies/'+id )
  }

}

