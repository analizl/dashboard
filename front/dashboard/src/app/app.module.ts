import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptolistComponent } from './cryptolist/cryptolist.component';
import { NewCryptoComponent } from './new-crypto/new-crypto.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptolistComponent,
    NewCryptoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
