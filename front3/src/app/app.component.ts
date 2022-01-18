import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Currency DashBoard';
  loggeado = false;
  user = '';

  constructor(private router: Router, private authService: AuthService) {
  }
  ngOnInit(): void {
    if (localStorage.getItem('SESSIONID')) {
      this.user = 'Bienvenido ' + localStorage.getItem("USERNAME")
      this.loggeado = true
    }
  }
  logout() {
    localStorage.clear()
    this.user = ''
    this.loggeado = false
    this.router.navigateByUrl('/login');
  }
}
