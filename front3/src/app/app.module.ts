import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptolistComponent } from './cryptolist/cryptolist.component';
import { NewCryptoComponent } from './new-crypto/new-crypto.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ExchangelistComponent } from './exchangelist/exchangelist.component';
import { NewExchangeComponent } from './new-exchange/new-exchange.component';
import { DetailExchangeComponent } from './detail-exchange/detail-exchange.component';
import { DetailTradeComponent } from './detail-trade/detail-trade.component';
import { NewTradeComponent } from './new-trade/new-trade.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptolistComponent,
    NewCryptoComponent,
    ExchangelistComponent,
    NewExchangeComponent,
    DetailExchangeComponent,
    DetailTradeComponent,
    NewTradeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
