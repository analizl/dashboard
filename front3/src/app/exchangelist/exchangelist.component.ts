import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {ExchangeService} from '../exchange.service';
import {Exchange} from '../model/Exchange';

@Component({
  selector: 'app-exchangelist',
  templateUrl: './exchangelist.component.html',
  styleUrls: ['./exchangelist.component.css']
})
export class ExchangelistComponent implements OnInit {

  constructor(private exService: ExchangeService, private authService: AuthService, private router: Router) {
    if (!authService.isAuthenticated()) {
      router.navigate(['login']);
    }
  }
  exchanges: Exchange[];
  whoami;

  ngOnInit() {
    this.authService.getUser(localStorage.getItem("EMAIL")).subscribe(u => {
      this.whoami = u.id;
      this.exService.getMyExchangeList(this.whoami)
        .subscribe(
          (response) => {
            console.log('response received')
            this.exchanges = response;
          },
          (error) => {
            console.error('Request failed with error', error)
          })
    })
  }

  onRemove(ex: Exchange) {
    this.exService.deleteAsociatedTrades(ex.id).subscribe((t) => this.exService.deleteExchange(ex)
      .subscribe((d) =>
        this.exService.getMyExchangeList(this.whoami)
          .subscribe(
            (response) => {                           //next() callback
              console.log('response received')
              this.exchanges = response;
            })
      ))
  }
}
