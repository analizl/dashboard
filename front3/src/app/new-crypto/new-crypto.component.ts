import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {DataServiceService} from '../data.service';
import {Crypto} from '../model/Crypto';

@Component({
  selector: 'app-new-crypto',
  templateUrl: './new-crypto.component.html',
  styleUrls: ['./new-crypto.component.css']
})
export class NewCryptoComponent implements OnInit {
  newCryptoForm: FormGroup = new FormGroup({
    cryptoName: new FormControl(),
    cryptoSymbol: new FormControl(),
    cryptoDescription: new FormControl(),
    cryptoWiki: new FormControl()
  });
  cryptos: Crypto[];
  pos = "";
  errorMessage = "";
  loading: Boolean;
  crypto: Crypto;
  erroresName: String = "";
  erroresSymbol: String = "";
  erroresDescription: String = "";
  erroresWiki: String = "";
  id;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private service: DataServiceService) {
    this.pos = route.snapshot.paramMap.get("pos");
    this.authService.getUser(localStorage.getItem("EMAIL")).subscribe(u => {
      this.id = u.id;

      if (this.pos) {
        this.loading = true;
        this.errorMessage = "";
        this.service.getMyCryptoList(this.id)
          .subscribe(
            (response) => {                           //next() callback
              console.log('response received')
              this.cryptos = response;
              this.crypto = this.cryptos[this.pos];

              this.newCryptoForm = new FormGroup({
                cryptoName: new FormControl(this.crypto.name),
                cryptoSymbol: new FormControl(this.crypto.symbol),
                cryptoDescription: new FormControl(this.crypto.description),
                cryptoWiki: new FormControl(this.crypto.wiki),
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
        this.crypto = new Crypto("", "", "", "", 0);
        this.newCryptoForm = new FormGroup({
          cryptoName: new FormControl(this.crypto.name),
          cryptoSymbol: new FormControl(this.crypto.symbol),
          cryptoDescription: new FormControl(this.crypto.description),
          cryptoWiki: new FormControl(this.crypto.wiki)
        });
      }

    })
  }

  ngOnInit() {

  }

  onSubmit() {

    var crypto = new Crypto(this.newCryptoForm.get("cryptoName").value,
      this.newCryptoForm.get("cryptoSymbol").value,
      this.newCryptoForm.get("cryptoDescription").value,
      this.newCryptoForm.get("cryptoWiki").value,
      this.id)

    if (!this.newCryptoForm.get("cryptoName").value) {
      this.erroresName = "Campo requerido"
    } else {
      this.erroresName = ""
    }
    if (!this.newCryptoForm.get("cryptoSymbol").value) {
      this.erroresSymbol = "Campo requerido"
    } else {
      this.erroresSymbol = ""
    } if (!this.newCryptoForm.get("cryptoDescription").value) {
      this.erroresDescription = "Campo requerido"
    } else {
      this.erroresDescription = ""
    } if (!this.newCryptoForm.get("cryptoWiki").value) {
      this.erroresWiki = "Campo requerido"
    } else {
      this.erroresWiki = ""
    }

    if (!this.erroresName && !this.erroresSymbol && !this.erroresDescription && !this.erroresWiki) {
      if (this.crypto.id) {
        console.log(crypto)
        this.service.updateCrypto(this.crypto.id, crypto);
      } else {
        this.service.addCrypto(crypto)
      }
      this.router.navigateByUrl("/")
    }
  }
}
