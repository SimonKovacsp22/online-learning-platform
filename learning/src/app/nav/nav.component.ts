import { Component } from '@angular/core';
import { faOtter, faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  faOtter = faOtter;
  faBars = faBars;

  constructor(
    private router: Router,
    public loginService: LoginService,
    private offcanvasService: NgbOffcanvas
  ) {}

  open() {
    const offcanvasRef = this.offcanvasService.open(SidebarComponent);
    offcanvasRef.componentInstance.name = 'World';
  }
}
