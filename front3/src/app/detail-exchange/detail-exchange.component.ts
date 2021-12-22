import { Component, OnInit } from '@angular/core';
import { Exchange } from '../model/Exchange';
import { ExchangeService } from '../exchange.service';
import { Trade } from '../model/Trade'
import { Router, ActivatedRoute } from '@angular/router';
import { Crypto } from '../model/Crypto';
import { DataServiceService } from '../data.service';
import { TradeService } from '../trade.service';

@Component({
  selector: 'app-detail-exchange',
  templateUrl: './detail-exchange.component.html',
  styleUrls: ['./detail-exchange.component.css']
})
export class DetailExchangeComponent implements OnInit {
  exchange:Exchange;
  trades:Trade[];
  idEx:String;
  cryptos:Crypto[];

  constructor(private tradeService: TradeService,private route: ActivatedRoute , private router:Router, private exService:ExchangeService, private cryptoService:DataServiceService) { 
    this.idEx=route.snapshot.paramMap.get("id");
    
    
  }
  ngOnInit() {
    this.exService.getExchange(this.idEx).subscribe((e)=>{
      this.exchange=e;
      this.exService.getExchangeTrades(this.idEx).subscribe(t=>this.trades=t)
    });
    this.cryptoService.getCryptoList().subscribe((res) => this.cryptos=res)
  }

  onRemove(trade:Trade){
    this.tradeService.deleteTrade(trade);
    this.exService.getExchangeTrades(this.idEx).subscribe(t=>this.trades=t)
  }

}
