import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Trade } from './model/Trade'
import { Price } from './model/Price';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private http:HttpClient) { }
  getTrade(id:String){
    return this.http.get<Trade>('http://localhost:3000/trades/'+id )
  }

  getPricesList(idT:String){
    return this.http.get<Price[]>('http://localhost:3000/trades/'+idT+'/prices')
  }

  getTradesList(){
    return this.http.get<Trade[]>('http://localhost:3000/trades/')
  }

  addTrade(trade:Trade){
    const body = {"script":trade.script, "exchange_id":trade.exchange_id, "currency_from_id":trade.currency_from_id,
    "currency_to_id":trade.currency_to_id, "exchangeId":trade.exchangeId}
    console.log(body)
    return this.http.post('http://localhost:3000/trades', body).subscribe(data => {
      console.log("POST Request in successful", data);
    },
    error => {
      console.log("Error",error);
    })
  }

  deleteTrade(trade:Trade){
    return this.http.delete('http://localhost:3000/trades/'+trade.id).subscribe()
  }
  
}
