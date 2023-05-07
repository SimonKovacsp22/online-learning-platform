import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faEnvelope,
  faLock,
  faOtter,
  faShield,
  faUser,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(router: Router) {}
  faEnvelope = faEnvelope;
  faLock = faLock;
  faOtter = faOtter;
  faShield = faShield;
  faUser = faUser;
  faUserGroup = faUserGroup;
}
