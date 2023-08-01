import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {DataServiceService} from '../data.service';
import {ExchangeService} from '../exchange.service';
import {Crypto} from '../model/Crypto';
import {Exchange} from '../model/Exchange';
import {Trade} from '../model/Trade';
import {TradeService} from '../trade.service';

@Component({
  selector: 'app-new-trade',
  templateUrl: './new-trade.component.html',
  styleUrls: ['./new-trade.component.css']
})
export class NewTradeComponent implements OnInit {
  newTradeForm: FormGroup;
  cryptos: Crypto[];
  exchanges: Exchange[];
  loading: Boolean;
  errorMessage = "";
  pos: String;
  trade: Trade;
  trades: Trade[];
  exId: Number;
  erroresCryptoFrom: String = "";
  erroresCryptoTo: String = "";
  erroresScript: String = "";
  id;

  constructor(private exchangeService: ExchangeService, private tradeService: TradeService, private route: ActivatedRoute, private router: Router, private cryptoService: DataServiceService, private authService: AuthService) {
    if (!authService.isAuthenticated()) {
      router.navigate(['login']);
    }
    this.exId = parseInt(route.snapshot.paramMap.get("idExchange"));
    console.log(this.exId)
    this.trade = new Trade("", 0, 0, 0, 0);
    this.newTradeForm = new FormGroup({
      tradeCryptoFrom: new FormControl(this.trade.currency_from_id),
      tradeCryptoTo: new FormControl(this.trade.currency_to_id),
      tradeScript: new FormControl(this.trade.script)
    });
  }

  ngOnInit() {
    this.authService.getUser(localStorage.getItem("EMAIL")).subscribe(u => {
      this.id = u.id;
      this.cryptoService.getMyCryptoList(this.id).subscribe((response) => {this.cryptos = response;})
      this.exchangeService.getMyExchangeList(this.id).subscribe(e => this.exchanges = e)
    })
  }

  onSubmit() {
    var trade = new Trade(this.newTradeForm.get("tradeScript").value,
      this.exId,
      parseInt(this.newTradeForm.get("tradeCryptoFrom").value),
      parseInt(this.newTradeForm.get("tradeCryptoTo").value),
      this.exId)
    if (!this.newTradeForm.get("tradeCryptoFrom").value) {
      this.erroresCryptoFrom = "Campo requerido"
    } else {
      this.erroresCryptoFrom = ""
    }
    if (!this.newTradeForm.get("tradeCryptoTo").value) {
      this.erroresCryptoTo = "Campo requerido"
    } else {
      this.erroresCryptoTo = ""
    } if (!this.newTradeForm.get("tradeScript").value) {
      this.erroresScript = "Campo requerido"
    } else {
      this.erroresScript = ""
    }

    if (!this.erroresCryptoFrom && !this.erroresCryptoTo && !this.erroresScript) {
      this.tradeService.addTrade(trade)
      this.router.navigateByUrl("/detail-exchange/" + this.exId)
    }
  }
}
