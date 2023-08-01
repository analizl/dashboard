import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {DataServiceService} from '../data.service';
import {Crypto} from '../model/Crypto';

@Component({
  selector: 'app-cryptolist',
  templateUrl: './cryptolist.component.html',
  styleUrls: ['./cryptolist.component.css']
})
export class CryptolistComponent implements OnInit {

  constructor(private router: Router, private cryptoService: DataServiceService, private authService: AuthService) {
    if (!authService.isAuthenticated()) {
      router.navigate(['login']);
    }
  }
  cryptos: Crypto[];
  whoami;

  ngOnInit() {
    this.authService.getUser(localStorage.getItem("EMAIL")).subscribe(u => {
      this.whoami = u.id;
      this.cryptoService.getMyCryptoList(this.whoami)
        .subscribe(
          (response) => {
            console.log('response received')
            this.cryptos = response;
          },
          (error) => {
            console.error('Request failed with error', error)
          })
    })

  }

  onRemove(crypto: Crypto) {

    this.cryptoService.deleteCrypto(crypto);
    this.cryptoService.getMyCryptoList(this.whoami)
      .subscribe(
        (response) => {
          console.log('response received')
          this.cryptos = response;
        },
        (error) => {
          console.error('Request failed with error')
        })

  }



}
