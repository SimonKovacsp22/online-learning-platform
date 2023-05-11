import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'learning';

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    if (sessionStorage.getItem('userdetails')) {
      this.loginService.user = JSON.parse(
        sessionStorage.getItem('userdetails')!
      );
    }
  }
}
