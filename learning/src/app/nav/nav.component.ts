import { Component } from '@angular/core';
import { faOtter } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  faOtter = faOtter;

  constructor(private router: Router, public loginService: LoginService) {}
}
