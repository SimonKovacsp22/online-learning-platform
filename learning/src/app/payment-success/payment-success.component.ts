import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    console.log(this.cartService.cart);
    let intent: string = '';
    let status: string = '';
    this.route.queryParams.subscribe((params) => {
      intent = params['payment_intent'];
      status = params['redirect_status'];
    });

    this.cartService.subject.subscribe((data) => {
      console.log(data.courses);
    });
  }
}
