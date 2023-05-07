import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
}
