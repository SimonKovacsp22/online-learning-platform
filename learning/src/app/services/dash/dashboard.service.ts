import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUser } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(environment.rooturl + '/categories', {
      observe: 'response',
    });
  }

  getCoursesByCategory(categoryId: number) {
    return this.http.get(environment.rooturl + '/categories/' + categoryId, {
      observe: 'response',
    });
  }

  getCourseById(courseId: number) {
    return this.http.get(environment.rooturl + '/courses/' + courseId, {
      observe: 'response',
    });
  }

  saveUser(user: IUser) {
    return this.http.post(environment.rooturl + '/register', user, {
      observe: 'response',
    });
  }
}
