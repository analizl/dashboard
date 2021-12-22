import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Price} from './model/Price';
import {Trade} from './model/Trade';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  headers;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.isAuthenticated()
  }
  getTrade(id: String) {
    return this.http.get<Trade>('http://localhost:3000/trades/' + id, {headers: this.headers})
  }

  getPricesList(idT: String) {
    return this.http.get<Price[]>('http://localhost:3000/trades/' + idT + '/prices', {headers: this.headers})
  }

  getTradesList() {
    return this.http.get<Trade[]>('http://localhost:3000/trades/', {headers: this.headers})
  }

  addTrade(trade: Trade) {
    const body = {
      "script": trade.script, "exchange_id": trade.exchange_id, "currency_from_id": trade.currency_from_id,
      "currency_to_id": trade.currency_to_id, "exchangeId": trade.exchangeId
    }
    console.log(body)
    return this.http.post('http://localhost:3000/trades', body, {headers: this.headers}).subscribe(data => {
      console.log("POST Request in successful", data);
    },
      error => {
        console.log("Error", error);
      })
  }

  deleteTrade(trade: Trade) {
    return this.http.delete('http://localhost:3000/trades/' + trade.id, {headers: this.headers}).subscribe()
  }

}
