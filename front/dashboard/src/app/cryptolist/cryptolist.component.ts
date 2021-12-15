import { Component, OnInit } from '@angular/core';
import { Crypto } from '../model/Crypto';
import {CryptoInMemoryService} from '../crypto-in-memory.service';

@Component({
  selector: 'app-cryptolist',
  template: `
    <div class="content">

      <!-- LIST OF Cryptos -->
      <div class="row justify-content-md-center">
        <ul class="list-group">
          <li class="list-group-item list-group-item-action" *ngFor="let crypto of cryptos()">
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

  constructor(private service: CryptoInMemoryService) {
 }

  ngOnInit(): void {
  }

  cryptos(){
    return this.service.getCryptosList();
  }

  onRemove(aCrypto:Crypto){
    this.service.deleteCrypto(aCrypto);
  }
  onEdit(aCrypto:Crypto){
  }

}
