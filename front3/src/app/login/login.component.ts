import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.form = this.fb.group({
      email: [''], //, Validators.required
      password: [''] //, Validators.required
    });
  }

  ngOnInit() {

  }
  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          (token) => {
            const TOKEN = Object.values(token)
            localStorage.setItem("SESSIONID", TOKEN.toString())
            localStorage.getItem("SESSIONID")

            console.log("User is logged in");
            this.router.navigateByUrl('/');
          }
        );
    }
  }


}