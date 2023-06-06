import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { of, switchMap } from 'rxjs';
import { environment } from '../environments/environment';

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
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
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
      this.cartService
        .fulfillOrder(this.loginService.user.email)
        .subscribe((data: IStatus) => {
          if (data.success) {
            if (this.cartService.cart) {
              this.cartService.cart.courses = [];
            }
            this.router.navigateByUrl('/learning');
          }
        });
    } else {
      this.error = true;
      this.errorStatus =
        paymentIntent.status === 'requires_payment_method'
          ? 'Payment not succesful, please try again.'
          : 'Something went wrong.';
    }
  }
}

interface IStatus {
  success: boolean;
  error?: string;
}
