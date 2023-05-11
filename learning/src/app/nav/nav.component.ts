import { Component, OnInit } from '@angular/core';
import { faCartShopping, faOtter } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { DashboardService } from '../services/dash/dashboard.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private router: Router,
    public loginService: LoginService,
    private dashboardService: DashboardService
  ) {}

  faCartShopping = faCartShopping;
  faOtter = faOtter;
  cartModalVisible = false;
  categoryModalVisible = false;

  onCategoriesHover = () => (this.categoryModalVisible = true);

  onCategoriesLeave = () => (this.categoryModalVisible = false);
  onCartHover = () => (this.cartModalVisible = true);

  onCartLeave = () => (this.cartModalVisible = false);

  ngOnInit() {}

  getCart() {
    this.dashboardService
      .getCartByUser(this.loginService.user)
      .subscribe((responseData) => {
        console.log(<any>responseData.body);
      });
  }

  logOut(): void {
    window.sessionStorage.setItem('userdetails', '');
    window.sessionStorage.setItem('XSRF-TOKEN', '');
    window.sessionStorage.setItem('Authorization', '');
    this.loginService.user = new User();
    this.router.navigate(['/login']);
  }
}
