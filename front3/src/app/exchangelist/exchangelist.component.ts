import {Component, OnInit} from '@angular/core';
import {ExchangeService} from '../exchange.service';
import {Exchange} from '../model/Exchange';

@Component({
  selector: 'app-exchangelist',
  templateUrl: './exchangelist.component.html',
  styleUrls: ['./exchangelist.component.css']
})
export class ExchangelistComponent implements OnInit {

  constructor(private exService: ExchangeService) { }
  exchanges: Exchange[];

  ngOnInit() {
    this.exService.getExchangeList()
      .subscribe(
        (response) => {
          console.log('response received')
          this.exchanges = response;
        },
        (error) => {
          console.error('Request failed with error', error)
        })
  }

  onRemove(ex: Exchange) {
    this.exService.deleteAsociatedTrades(ex.id).subscribe((t) => this.exService.deleteExchange(ex)
      .subscribe((d) =>
        this.exService.getExchangeList()
          .subscribe(
            (response) => {                           //next() callback
              console.log('response received')
              this.exchanges = response;
            })
      ))
  }
}
