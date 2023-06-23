import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  constructor(public loginService: LoginService, private router: Router) {}

  authStatus: string = '';
  credentials = {
    email: '',
    password: '',
  };
  faEnvelope = faEnvelope;
  faLock = faLock;
  faOtter = faOtter;
  isError = false;
  isLoading = false;

  ngOnInit() {
    if (this.loginService.user.authStatus === 'AUTH')
      this.router.navigate(['/']);
  }

  validateUser(loginForm: NgForm) {
    this.isLoading = true;
    this.loginService
      .validateLoginDetails(this.loginService.user)
      .subscribe((data) => {
        if (data.status !== 200) {
          console.log(data);
          this.isError = true;
          this.isLoading = false;
          return;
        }
        window.sessionStorage.setItem(
          'Authorization',
          data.headers.get('Authorization')!
        );
        this.loginService.user = <any>data.body.user;
        this.loginService.user.authStatus = 'AUTH';
        window.sessionStorage.setItem(
          'userdetails',
          JSON.stringify(this.loginService.user)
        );
        let xsrf = getCookie('XSRF-TOKEN')!;
        window.sessionStorage.setItem('XSRF-TOKEN', xsrf);
        this.isLoading = false;
        this.router.navigate(['/']);
      });
  }
}
