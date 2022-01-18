import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    let body = {"email": email, "password": password}
    return this.http.post<Object>('http://localhost:3000/users/login', body)
  }
  isAuthenticated() {
    if (localStorage.getItem('SESSIONID')) {
      return new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('SESSIONID'))
    }
  }
  async whoAmI(): Promise<Observable<String>> {
    let headers = this.isAuthenticated()
    if (headers) {
      return this.http.get<String>('http://localhost:3000/whoAmI', {headers: headers})
    }
  }
  register(email: string, username: string, password: string) {
    let body = {"email": email, "password": password, "username": username}
    return this.http.post<User>('http://localhost:3000/signup', body)
  }
}
