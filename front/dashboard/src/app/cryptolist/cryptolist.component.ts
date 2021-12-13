import { Component, OnInit } from '@angular/core';
import { Crypto } from '../model/Crypto';

@Component({
  selector: 'app-cryptolist',
  template: `
    <div class="content">

      <!-- LIST OF Cryptos -->
      <div class="row justify-content-md-center">
        <ul class="list-group">
          <li class="list-group-item list-group-item-action" *ngFor="let crypto of cryptos">
            <span>{{crypto.name}} - </span>
            <span>{{crypto.symbol}}</span>
            <div class="pull-right">
              <button class="btn btn-primary btn-xs fa fa-pencil" (click)="onEdit(crypto)"></button>
              <button class="btn btn-danger btn-xs fa fa-trash-o" (click)="onRemove(crypto)"></button>
            </div>
          </li>
        </ul>
      </div>

      <!-- NEW Crypto -->
      <div class="row justify-content-md-center">
        <nav>
          <a routerLink="/new-crypto" class="pull-right">New crypto</a>
        </nav>
      </div>


  `,
  styles: [
  ]
})
export class CryptolistComponent implements OnInit {
  cryptos : Crypto[];
  constructor() {
    this.cryptos = [
      new Crypto("Bitcoin", "BTC", "a description", "a wiki url"),
      new Crypto("Ethereum", "ETH", "a description", "a wiki url"),
      new Crypto("Otra crypto", "ABC", "a description", "a wiki url"),
    ];

  }

  ngOnInit(): void {
  }

  onRemove(aCrypto:Crypto){
    this.cryptos = this.cryptos.filter(crypto => crypto !== aCrypto);
  }
  onEdit(aCrypto:Crypto){
  }

}
