import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Purchase } from 'src/app/models/purchase.model';
import { ICart } from 'src/app/models/cart.model';
import { OrderItem } from 'src/app/models/order-item.mode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent implements OnInit {
  paymentIntentClientSecret: string | null = '';
  status: string | null = '';
  stripe = Stripe(environment.stripePublicKey);
  error: boolean = false;
  errorStatus: string = '';
  cart: ICart | null = null;
  isLoading: boolean = false;
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private http: HttpClient
  ) {
    this.paymentIntentClientSecret = this.route.snapshot.queryParamMap.get(
      'payment_intent_client_secret'
    );
  }
  async ngOnInit() {
    const { paymentIntent } = await this.stripe.retrievePaymentIntent(
      this.paymentIntentClientSecret
    );
    if (paymentIntent.status === 'succeeded') {
      this.isLoading = true;
      this.cartService
        .getCartByUser(this.loginService.user)
        .subscribe((responseData) => {
          this.cart = <any>responseData.body;
          this.cartService.cart = <any>responseData.body;
          this.fulfillOrder(this.loginService.user.email).subscribe(
            (data: IStatus) => {
              if (data.success) {
                if (this.cartService.cart) {
                  this.cartService.cart.courses = [];
                  this.cart = null;
                }
                this.isLoading = false;
                this.router.navigateByUrl('/learning');
              }
            }
          );
        });
    } else {
      this.error = true;
      this.isLoading = false;
      this.errorStatus =
        paymentIntent.status === 'requires_payment_method'
          ? 'Payment not succesful, please try again.'
          : 'Something went wrong.';
    }
  }

  fulfillOrder(email: string): Observable<any> {
    if (this.cart) {
      let orderItems = this.cart.courses.map((c) => new OrderItem(c));

      return this.http.post<Purchase>(
        environment.rooturl + '/checkout/purchase',
        { email, orderItems }
      );
    } else return new Observable(undefined);
  }
}

interface IStatus {
  success: boolean;
  error?: string;
}
