import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Exchange} from './model/Exchange';
import {Trade} from './model/Trade';

@Injectable({providedIn: 'root'})
export class ExchangeService {
  headers;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.isAuthenticated()
  }
  getExchangeList(): Observable<any> {
    return this.http.get<Exchange[]>('http://localhost:3000/exchanges', {headers: this.headers})
  }
  addExchange(ex: Exchange) {
    return this.http.post('http://localhost:3000/exchanges', ex, {headers: this.headers}).subscribe()
  }

  updateExchange(idx: String, ex: Exchange) {
    const body = {"name": ex.name}
    this.http.put('http://localhost:3000/exchanges/' + idx, body, {headers: this.headers}).subscribe(data => {
      console.log("PUT Request is successful ", data);
    },
      error => {
        console.log("Error", error);
      })
  }

  deleteAsociatedTrades(idx: String) {
    return this.http.delete('http://localhost:3000/exchanges/' + idx + '/trades', {headers: this.headers})
  }

  deleteExchange(ex: Exchange) {
    return this.http.delete('http://localhost:3000/exchanges/' + ex.id, {headers: this.headers})

  }

  getExchange(id: String) {
    return this.http.get<Exchange>('http://localhost:3000/exchanges/' + id, {headers: this.headers})
  }

  getExchangeTrades(id: String) {
    return this.http.get<Trade[]>('http://localhost:3000/exchanges/' + id + '/trades', {headers: this.headers})
  }

}

