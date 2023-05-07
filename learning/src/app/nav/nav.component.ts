import { Component, OnInit } from '@angular/core';
import { faCartShopping, faOtter } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private router: Router, public loginService: LoginService) {}

  faCartShopping = faCartShopping;
  faOtter = faOtter;
  cartModalVisible = false;
  categoryModalVisible = false;

  onCategoriesHover = () => (this.categoryModalVisible = true);

  onCategoriesLeave = () => (this.categoryModalVisible = false);
  onCartHover = () => (this.cartModalVisible = true);

  onCartLeave = () => (this.cartModalVisible = false);

  ngOnInit() {
    if (sessionStorage.getItem('userdetails')) {
      this.loginService.user = JSON.parse(
        sessionStorage.getItem('userdetails')!
      );
    }
  }

  logOut(): void {
    window.sessionStorage.setItem('userdetails', '');
    window.sessionStorage.setItem('XSRF-TOKEN', '');
    window.sessionStorage.setItem('Authorization', '');
    this.loginService.user = new User();
    this.router.navigate(['/login']);
  }
}
