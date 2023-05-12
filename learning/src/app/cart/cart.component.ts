import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart-service.service';
import { LoginService } from '../services/login/login.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../services/course/course.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  faStar = faStar;
  constructor(
    public cartService: CartService,
    public loginService: LoginService,
    public courseService: CourseService
  ) {}
}
