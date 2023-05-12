import { Component } from '@angular/core';
import { faEnvelope, faLock, faOtter } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { getCookie } from 'typescript-cookie';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public loginService: LoginService, private router: Router) {}
  authStatus: string = '';
  credentials = {
    email: '',
    password: '',
  };
  faEnvelope = faEnvelope;
  faLock = faLock;
  faOtter = faOtter;

  validateUser(loginForm: NgForm) {
    this.loginService
      .validateLoginDetails(this.loginService.user)
      .subscribe((responseData) => {
        console.log(responseData);
        window.sessionStorage.setItem(
          'Authorization',
          responseData.headers.get('Authorization')!
        );
        this.loginService.user = <any>responseData.body;
        this.loginService.user.authStatus = 'AUTH';
        window.sessionStorage.setItem(
          'userdetails',
          JSON.stringify(this.loginService.user)
        );
        let xsrf = getCookie('XSRF-TOKEN')!;
        window.sessionStorage.setItem('XSRF-TOKEN', xsrf);
        this.router.navigate(['/']);
      });
  }
}
