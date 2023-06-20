import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { CartService } from '../../services/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  stripe = Stripe(environment.stripePublicKey);
  clientSecret: string = '';
  elements: any;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const appearance = {
      theme: 'stripe',
    };

    this.route.queryParams.subscribe((params) => {
      this.clientSecret = params['client_secret'];
      if (this.clientSecret === '' || this.clientSecret == null) {
        window.alert('Error processing.');
        this.router.navigateByUrl('/cart');
        return;
      }
      this.elements = this.stripe.elements({
        appearance,
        clientSecret: this.clientSecret,
      });
      const linkAuthenticationElement =
        this.elements.create('linkAuthentication');
      linkAuthenticationElement.mount('#link-authentication-element');

      linkAuthenticationElement.on('change', (event: any) => {
        const emailAddress = event.value.email;
      });

      const paymentElementOptions = {
        layout: 'tabs',
      };

      const paymentElement = this.elements.create(
        'payment',
        paymentElementOptions
      );
      paymentElement.mount('#payment-element');
    });
  }

  async confirmPayment(event: Event) {
    event.preventDefault();
    this.setLoading(true);
    this.router.navigate(['/success'], {
      queryParams: { payment_intent: 'succeeded' },
    });
    this.setLoading(false);
  }

  setLoading(isLoading: boolean) {
    if (isLoading) {
      // @ts-ignore
      document.querySelector('#submit').disabled = true; // @ts-ignore

      document.querySelector('#spinner').classList.remove('hidden'); // @ts-ignore

      document.querySelector('#button-text').classList.add('hidden');
    } else {
      // @ts-ignore
      document.querySelector('#submit').disabled = false; // @ts-ignore
      document.querySelector('#spinner').classList.add('hidden'); // @ts-ignore
      document.querySelector('#button-text').classList.remove('hidden');
    }
  }

  showMessage(messageText: any) {
    const messageContainer = document.querySelector('#payment-message');
    // @ts-ignore
    messageContainer.classList.remove('hidden'); // @ts-ignore
    messageContainer.textContent = messageText;

    setTimeout(function () {
      // @ts-ignore
      messageContainer.classList.add('hidden');
      messageText.textContent = '';
    }, 4000);
  }
}
