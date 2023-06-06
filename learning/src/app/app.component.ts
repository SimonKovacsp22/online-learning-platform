import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'learning';

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem('userdetails')) {
      this.loginService.user = JSON.parse(
        sessionStorage.getItem('userdetails')!
      );
    }
  }

  isContainerFluidRoute(): boolean {
    // @ts-ignore
    const route = this.route.snapshot['_routerState'].url;

    return (
      route === '/learning' ||
      route.includes('/learning/my') ||
      route.includes('/teach')
    );
  }

  isNavbarVisible(): boolean {
    // @ts-ignore
    const route = this.route.snapshot['_routerState'].url;
    return route.includes('/learning/my') || route.includes('/teach');
  }
}
