import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Crypto} from './model/Crypto';

@Injectable({providedIn: 'root'})
export class DataServiceService {
  headers;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.isAuthenticated()

  }
  getCryptoList(): Observable<any> {
    return this.http.get<Crypto[]>('http://localhost:3000/crypto-currencies', {headers: this.headers})
  }
  addCrypto(crypto: Crypto) {

    return this.http.post('http://localhost:3000/crypto-currencies', crypto, {headers: this.headers}).subscribe()
  }

  updateCrypto(idx: String, crypto: Crypto) {
    const body = {"name": crypto.name, "symbol": crypto.symbol, "description": crypto.description, "wiki": crypto.wiki}
    this.http.put('http://localhost:3000/crypto-currencies/' + idx, body, {headers: this.headers}).subscribe(data => {
      console.log("PUT Request is successful ", data);
    },
      error => {
        console.log("Error", error);
      })
  }

  deleteCrypto(crypto: Crypto) {
    return this.http.delete('http://localhost:3000/crypto-currencies/' + crypto.id, {headers: this.headers}).subscribe()
  }

  getCrypto(id: String) {
    return this.http.get<Crypto>('http://localhost:3000/crypto-currencies/' + id, {headers: this.headers})
  }

}

