import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent {
  userModalVisible = false;
  constructor(private router: Router, public loginService: LoginService) {}

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }

  onAvatarHover = () => (this.userModalVisible = true);

  onAvatarLeave = () => (this.userModalVisible = false);
}
