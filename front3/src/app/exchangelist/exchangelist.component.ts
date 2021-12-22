import { Component, OnInit } from '@angular/core';
import { Exchange } from '../model/Exchange';
import { ExchangeService } from '../exchange.service';

@Component({
  selector: 'app-exchangelist',
  templateUrl: './exchangelist.component.html',
  styleUrls: ['./exchangelist.component.css']
})
export class ExchangelistComponent implements OnInit {

  constructor(private exService:ExchangeService) { }
  exchanges:Exchange[];
  loading:Boolean;
  errorMessage=""
  
  ngOnInit() {
    this.loading = true;
    this.errorMessage = "";
    this.exService.getExchangeList()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          this.exchanges = response;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed
          this.loading = false;
        })
  }

  onRemove(ex:Exchange){
    this.exService.deleteAsociatedTrades(ex.id).subscribe((t)=>this.exService.deleteExchange(ex)
    .subscribe((d)=>
    this.exService.getExchangeList()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          this.exchanges = response;
        })
        ))
  }

}
