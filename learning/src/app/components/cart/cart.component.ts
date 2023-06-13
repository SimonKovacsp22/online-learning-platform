import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { LoginService } from '../../services/login/login.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../../services/course/course.service';
import { ICourse } from '../../models/course.model';
import { Router } from '@angular/router';
import { OrderItem } from '../../models/order-item.mode';
import { environment } from '../../environments/environment';

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
    public courseService: CourseService,
    private router: Router
  ) {}

  removeCourseFromCart(course: ICourse) {
    this.cartService
      .removeCourseFromCart(this.loginService.user, course)
      .subscribe((responseData) => {
        if (<any>responseData.status === 200) {
          if (this.cartService.cart == null) return;
          const filteredCourses = this.cartService.cart.courses.filter(
            (c) => c.id !== course.id
          );
          this.cartService.cart.courses = filteredCourses;
        }
      });
  }

  checkout() {
    if (this.cartService.cart != null) {
      let orderItems: OrderItem[] = [];
      orderItems = this.cartService.cart?.courses.map((c) => new OrderItem(c));
      this.cartService
        .createPaymentIntent({
          orderItems,
          currency: 'EUR',
          receiptEmail: this.loginService.user.email,
        })
        .subscribe((responseData) => {
          this.router.navigateByUrl(
            '/checkout?client_secret=' + responseData.client_secret
          );
        });
    }
  }
}
