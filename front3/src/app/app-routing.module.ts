import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CryptolistComponent } from './cryptolist/cryptolist.component';
import { NewCryptoComponent } from './new-crypto/new-crypto.component';
import { ExchangelistComponent } from './exchangelist/exchangelist.component';
import { NewExchangeComponent } from './new-exchange/new-exchange.component';
import { DetailExchangeComponent } from './detail-exchange/detail-exchange.component';
import { DetailTradeComponent } from './detail-trade/detail-trade.component';
import { NewTradeComponent } from './new-trade/new-trade.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: CryptolistComponent },
  { path: 'new-crypto', component: NewCryptoComponent },
  { path: 'modify-crypto/:pos', component: NewCryptoComponent },
  { path: 'exchange', component: ExchangelistComponent },
  { path: 'new-exchange', component: NewExchangeComponent },
  { path: 'modify-exchange/:pos', component: NewExchangeComponent },
  { path: 'detail-exchange/:id', component: DetailExchangeComponent},
  { path: 'detail-trade/:id', component: DetailTradeComponent},
  { path: 'new-trade', component: NewTradeComponent},
  { path: 'new-trade/:idExchange', component: NewTradeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
