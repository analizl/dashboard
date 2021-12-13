import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptolistComponent } from './cryptolist/cryptolist.component';
import { NewCryptoComponent } from './new-crypto/new-crypto.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: CryptolistComponent },
  { path: 'new-crypto', component: NewCryptoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
