import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {DataServiceService} from '../data.service';
import {Crypto} from '../model/Crypto';

@Component({
  selector: 'app-cryptolist',
  templateUrl: './cryptolist.component.html',
  styleUrls: ['./cryptolist.component.css']
})
export class CryptolistComponent implements OnInit {

  constructor(private cryptoService: DataServiceService, private authService: AuthService) { }
  cryptos: Crypto[];
  whoami;

  ngOnInit() {
    this.cryptoService.getCryptoList()
      .subscribe(
        (response) => {
          console.log('response received')
          this.cryptos = response;
        },
        (error) => {
          console.error('Request failed with error', error)
        })
  }

  onRemove(crypto: Crypto) {

    this.cryptoService.deleteCrypto(crypto);
    this.cryptoService.getCryptoList()
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
