import { Component, OnInit } from '@angular/core';
import { Crypto } from '../model/Crypto';
import { DataServiceService } from '../data.service';

@Component({
  selector: 'app-cryptolist',
  templateUrl: './cryptolist.component.html',
  styleUrls: ['./cryptolist.component.css']
})
export class CryptolistComponent implements OnInit {

  constructor(private cryptoService:DataServiceService) { }
  cryptos:Crypto[];
  loading:Boolean;
  errorMessage=""
  
  ngOnInit() {
    this.loading = true;
    this.errorMessage = "";
    this.cryptoService.getCryptoList()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          this.cryptos = response;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed
          this.loading = false;
        })
  }

  onRemove(crypto:Crypto){
    
    this.cryptoService.deleteCrypto(crypto);
    this.loading = true;
    this.errorMessage = "";
    this.cryptoService.getCryptoList()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          this.cryptos = response;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed
          this.loading = false;
        })

  }
 

}
