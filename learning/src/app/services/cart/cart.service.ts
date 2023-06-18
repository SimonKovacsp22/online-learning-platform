import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ICart } from 'src/app/models/cart.model';
import { ICourse } from 'src/app/models/course.model';
import { OrderItem } from 'src/app/models/order-item.mode';
import { Order } from 'src/app/models/order.model';
import { PaymentInfo } from 'src/app/models/payment-info.model';
import { IPurchase, Purchase } from 'src/app/models/purchase.model';
import { IUser } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: ICart | null = null;

  public paymentIntent$ = new Observable<string>();
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

  createPaymentIntent(info: PaymentInfo): Observable<any> {
    return this.http.post<PaymentInfo>(environment.rooturl + '/checkout', info);
  }

  isCourseInCart(course: ICourse) {
    return this.cart?.courses.findIndex((c) => c.id === course.id) !== -1;
  }
}
