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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    if (authService.isAuthenticated()) {
      router.navigate(['home']);
    }
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
            localStorage.setItem("EMAIL", (val.email).toString())

            this.authService.getUser(val.email).subscribe(u => {
              localStorage.setItem("USERNAME", (u.username).toString())
              console.log("User is logged in");
              location.href = '/';
            })


          }
        );
    }
  }


}
