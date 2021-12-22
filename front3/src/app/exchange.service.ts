import { Injectable } from '@angular/core';
import { Exchange } from './model/Exchange';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Trade } from './model/Trade'

@Injectable({  providedIn: 'root' })
export class ExchangeService {
  constructor(private http:HttpClient) {

  }
   exchanges = [
   
  ];
  getExchangeList():Observable<any>{
    return this.http.get<Exchange[]>('http://localhost:3000/exchanges',  {observe: 'body'})
  } 
  addExchange(ex:Exchange){
    return this.http.post('http://localhost:3000/exchanges', ex).subscribe()
  }

  updateExchange(idx:String,ex:Exchange){
    const body = {"name":ex.name}
    this.http.put('http://localhost:3000/exchanges/'+idx, body).subscribe(data => {
        console.log("PUT Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }) 
  }

deleteAsociatedTrades(idx:String){
  return this.http.delete('http://localhost:3000/exchanges/'+idx+'/trades' )
}

deleteExchange(ex:Exchange){
  return this.http.delete('http://localhost:3000/exchanges/'+ex.id )

}

getExchange(id:String){
  return this.http.get<Exchange>('http://localhost:3000/exchanges/'+id )
}

getExchangeTrades(id:String){
  return this.http.get<Trade[]>('http://localhost:3000/exchanges/'+id+'/trades')
}

}

