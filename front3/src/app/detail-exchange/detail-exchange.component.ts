import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {DataServiceService} from '../data.service';
import {ExchangeService} from '../exchange.service';
import {Crypto} from '../model/Crypto';
import {Exchange} from '../model/Exchange';
import {Trade} from '../model/Trade';
import {TradeService} from '../trade.service';

@Component({
  selector: 'app-detail-exchange',
  templateUrl: './detail-exchange.component.html',
  styleUrls: ['./detail-exchange.component.css']
})
export class DetailExchangeComponent implements OnInit {
  exchange: Exchange;
  trades: Trade[];
  idEx: String;
  cryptos: Crypto[];

  constructor(private authService: AuthService, private tradeService: TradeService, private route: ActivatedRoute, private router: Router, private exService: ExchangeService, private cryptoService: DataServiceService) {
    if (!authService.isAuthenticated()) {
      router.navigate(['login']);
    }
    this.idEx = route.snapshot.paramMap.get("id");


  }
  ngOnInit() {
    this.exService.getExchange(this.idEx).subscribe((e) => {
      this.exchange = e;
      this.exService.getExchangeTrades(this.idEx).subscribe(t => this.trades = t)
    });
    this.cryptoService.getCryptoList().subscribe((res) => this.cryptos = res)
  }

  onRemove(trade: Trade) {
    this.tradeService.deleteTrade(trade);
    this.exService.getExchangeTrades(this.idEx).subscribe(t => this.trades = t)
  }
}
