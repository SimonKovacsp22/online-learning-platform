import { Component, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../services/login/login.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() name = 'World';
  faXmark = faXmark;
  constructor(
    public activeOffcanvas: NgbActiveOffcanvas,
    public loginService: LoginService
  ) {}
}
