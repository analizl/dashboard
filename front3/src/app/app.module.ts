import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CryptolistComponent} from './cryptolist/cryptolist.component';
import {DetailExchangeComponent} from './detail-exchange/detail-exchange.component';
import {DetailTradeComponent} from './detail-trade/detail-trade.component';
import {ExchangelistComponent} from './exchangelist/exchangelist.component';
import {LoginComponent} from './login/login.component';
import {NewCryptoComponent} from './new-crypto/new-crypto.component';
import {NewExchangeComponent} from './new-exchange/new-exchange.component';
import {NewTradeComponent} from './new-trade/new-trade.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    CryptolistComponent,
    NewCryptoComponent,
    ExchangelistComponent,
    NewExchangeComponent,
    DetailExchangeComponent,
    DetailTradeComponent,
    NewTradeComponent,
    LoginComponent,
    RegisterComponent
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
