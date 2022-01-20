import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {ExchangeService} from '../exchange.service';
import {Exchange} from '../model/Exchange';

@Component({
  selector: 'app-new-exchange',
  templateUrl: './new-exchange.component.html',
  styleUrls: ['./new-exchange.component.css']
})
export class NewExchangeComponent implements OnInit {

  newExchangeForm: FormGroup = new FormGroup({
    exchangeName: new FormControl()
  });
  exchanges: Exchange[];
  pos = "";
  errorMessage = "";
  loading: Boolean;
  exchange: Exchange;
  erroresName: String = "";
  id;

  constructor(private route: ActivatedRoute, private router: Router, private service: ExchangeService, private authService: AuthService) {
    if (!authService.isAuthenticated()) {
      router.navigate(['login']);
    }
    this.pos = route.snapshot.paramMap.get("pos");
    this.authService.getUser(localStorage.getItem("EMAIL")).subscribe(u => {
      this.id = u.id;
      if (this.pos) {
        this.loading = true;
        this.errorMessage = "";
        this.service.getMyExchangeList(this.id)
          .subscribe(
            (response) => {                           //next() callback
              console.log('response received')
              this.exchanges = response;
              this.exchange = this.exchanges[this.pos];
              console.log(this.exchanges[this.pos]);
              this.newExchangeForm = new FormGroup({
                exchangeName: new FormControl(this.exchange.name)
              });
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
      } else {
        this.exchange = new Exchange("", 0);
        this.newExchangeForm = new FormGroup({
          exchangeName: new FormControl(this.exchange.name)
        });
      }

    })
  }

  ngOnInit() {

  }

  onSubmit() {
    var exchange = new Exchange(this.newExchangeForm.get("exchangeName").value,
      this.id)
    //validate fields
    if (!this.newExchangeForm.get("exchangeName").value) {
      this.erroresName = "Campo requerido"
    } else {
      if (this.exchange.id) {
        this.service.updateExchange(this.exchange.id, exchange);
      } else {
        this.service.addExchange(exchange)
      }
      this.router.navigateByUrl("/exchange")
    }
  }
}
