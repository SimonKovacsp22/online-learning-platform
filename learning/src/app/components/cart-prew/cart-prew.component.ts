import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dash/dashboard.service';
import { LoginService } from '../../services/login/login.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ICart } from '../../models/cart.model';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-prew',
  templateUrl: './cart-prew.component.html',
  styleUrls: ['./cart-prew.component.css'],
})
export class CartPrewComponent implements OnInit {
  faCartShopping = faCartShopping;
  cartModalVisible = false;

  constructor(
    private router: Router,
    public cartService: CartService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.getCart();
  }

  onCartHover = () => (this.cartModalVisible = true);

  onCartLeave = () => (this.cartModalVisible = false);

  getCart() {
    this.cartService
      .getCartByUser(this.loginService.user)
      .subscribe((responseData) => {
        this.cartService.cart = <any>responseData.body;
      });
  }
}
