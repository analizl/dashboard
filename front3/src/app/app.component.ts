import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Collapsible wrapper -->
      <div
        class="collapse navbar-collapse justify-content-center"
        id="navbarCenteredExample"
      >
        <!-- Left links -->
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" routerLink="home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="exchange">Exchanges</a>
          </li>
        </ul>
        <!-- Left links -->
      </div>
      <!-- Collapsible wrapper -->
    </div>
    <!-- Container wrapper -->
  </nav>
  
  <div class="row justify-content-md-center">
  <h1>{{title}}</h1>
  </div>
  <router-outlet></router-outlet>

  `,
  styles: []
})
export class AppComponent {
  title = 'Currency DashBoard';
}
