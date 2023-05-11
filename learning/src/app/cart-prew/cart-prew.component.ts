import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dash/dashboard.service';
import { LoginService } from '../services/login/login.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ICart } from '../models/cart.model';

@Component({
  selector: 'app-cart-prew',
  templateUrl: './cart-prew.component.html',
  styleUrls: ['./cart-prew.component.css'],
})
export class CartPrewComponent implements OnInit {
  faCartShopping = faCartShopping;
  cartModalVisible = false;
  cart: ICart | null = null;

  constructor(
    private dashboardService: DashboardService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    console.log('initing');
    this.getCart();
  }

  onCartHover = () => (this.cartModalVisible = true);

  onCartLeave = () => (this.cartModalVisible = false);

  getCart() {
    this.dashboardService
      .getCartByUser(this.loginService.user)
      .subscribe((responseData) => {
        this.cart = <any>responseData.body;
      });
  }
}
