import { Component } from '@angular/core';
import { faCartShopping, faOtter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  faCartShopping = faCartShopping;
  faOtter = faOtter;
  cartModalVisible = true;
  onCartHover = () => (this.cartModalVisible = false);

  onCartLeave = () => (this.cartModalVisible = true);
}
