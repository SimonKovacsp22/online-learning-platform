import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ICart } from 'src/app/models/cart.model';
import { ICourse } from 'src/app/models/course.model';
import { IUser } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: ICart | null = null;
  constructor(private http: HttpClient) {}

  getCartByUser(user: IUser) {
    return this.http.get(environment.rooturl + '/cart/' + user.id, {
      observe: 'response',
      withCredentials: true,
    });
  }

  addCourseToCart(user: IUser, course: ICourse) {
    const body = {
      courseId: course.id,
      userId: user.id,
    };
    return this.http.post(environment.rooturl + '/cart/add', body, {
      observe: 'response',
      withCredentials: true,
    });
  }

  removeCourseFromCart(user: IUser, course: ICourse) {
    const body = {
      courseId: course.id,
      userId: user.id,
    };
    return this.http.post(environment.rooturl + '/cart/remove', body, {
      observe: 'response',
      withCredentials: true,
    });
  }

  calculateTotal(courses: ICourse[]) {
    const initialValue = 0;
    const total = courses.reduce(
      // @ts-ignore
      (acc, { price }: ICourse) => {
        return acc + price;
      },
      initialValue
    );
    return total;
  }

  isCourseInCart(course: ICourse) {
    return this.cart?.courses.findIndex((c) => (c.id = course.id)) !== -1;
  }
}
