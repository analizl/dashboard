import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data.service';
import { Crypto } from '../model/Crypto'
import { Trade } from '../model/Trade'
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TradeService } from '../trade.service';
import { ExchangeService } from '../exchange.service';
import { Exchange } from '../model/Exchange';

@Component({
  selector: 'app-new-trade',
  templateUrl: './new-trade.component.html',
  styleUrls: ['./new-trade.component.css']
})
export class NewTradeComponent implements OnInit {
  newTradeForm: FormGroup;
  cryptos:Crypto[];
  exchanges:Exchange[];
  loading:Boolean;
  errorMessage="";
  pos:String;
  trade:Trade;
  trades:Trade[];
  exId:Number;
  erroresCryptoFrom:String="";
  erroresCryptoTo:String="";
  erroresScript:String="";

  constructor(private exchangeService:ExchangeService,private tradeService: TradeService,private route: ActivatedRoute , private router:Router,  private cryptoService:DataServiceService) { 
    this.exId=parseInt(route.snapshot.paramMap.get("idExchange"));
    console.log(this.exId)
    this.trade= new Trade("",0,0,0,0);
    this.newTradeForm = new FormGroup({
          tradeCryptoFrom: new FormControl(this.trade.currency_from_id),
          tradeCryptoTo: new FormControl(this.trade.currency_to_id),
          tradeScript: new FormControl(this.trade.script)
    });
  }

  ngOnInit() {
      this.cryptoService.getCryptoList().subscribe((response) => {this.cryptos = response;})
      this.exchangeService.getExchangeList().subscribe(e=>this.exchanges=e)
  }

  onSubmit(){
    var trade=new Trade(this.newTradeForm.get("tradeScript").value,
                        this.exId,
                        parseInt(this.newTradeForm.get("tradeCryptoFrom").value),
                        parseInt(this.newTradeForm.get("tradeCryptoTo").value),
                        this.exId)
    if (!this.newTradeForm.get("tradeCryptoFrom").value){
      this.erroresCryptoFrom="Campo requerido"
    } else {
      this.erroresCryptoFrom=""
    }
    if (!this.newTradeForm.get("tradeCryptoTo").value){
      this.erroresCryptoTo="Campo requerido"
    } else {
      this.erroresCryptoTo=""
    }if (!this.newTradeForm.get("tradeScript").value){
      this.erroresScript="Campo requerido"
    } else {
      this.erroresScript=""
    }
    
    if(!this.erroresCryptoFrom && !this.erroresCryptoTo && !this.erroresScript) {
      this.tradeService.addTrade(trade)
      this.router.navigateByUrl("/detail-exchange/"+this.exId)
    }
  }

}
