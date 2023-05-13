import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart-service.service';
import { LoginService } from '../services/login/login.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../services/course/course.service';
import { ICourse } from '../models/course.model';

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
}
