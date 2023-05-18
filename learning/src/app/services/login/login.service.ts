import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, User } from 'src/app/models/user.model';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  user = new User();
  validateLoginDetails(user: IUser) {
    window.sessionStorage.setItem('userdetails', JSON.stringify(user));
    return this.http
      .get(environment.rooturl + '/user', {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        // @ts-ignore
        catchError((error) => {
          console.log(error);
          return of(error);
        })
      );
  }

  logOut(): void {
    window.sessionStorage.setItem('userdetails', '');
    window.sessionStorage.setItem('XSRF-TOKEN', '');
    window.sessionStorage.setItem('Authorization', '');
    this.user = new User();
  }
}
