import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faEnvelope,
  faLock,
  faOtter,
  faShield,
  faUser,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { DashboardService } from 'src/app/services/dash/dashboard.service';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private loginService: LoginService
  ) {}
  faEnvelope = faEnvelope;
  faLock = faLock;
  faOtter = faOtter;
  faShield = faShield;
  faUser = faUser;
  faUserGroup = faUserGroup;
  isLoading = false;
  isError = false;
  model = new User();

  ngOnInit() {
    if (this.loginService.user.authStatus === 'AUTH')
      this.router.navigate(['/']);
  }
  saveUser(registerForm: NgForm) {
    this.model.role = 'user';
    this.isLoading = true;
    this.dashboardService
      .saveUser(this.model)
      .subscribe((responseData: any) => {
        if (responseData.body && responseData.body.id) {
          this.isLoading = false;
          registerForm.resetForm();
          this.router.navigate(['/login']);
        } else {
          this.isLoading = false;
          this.isError = true;
        }
      });
  }
}
