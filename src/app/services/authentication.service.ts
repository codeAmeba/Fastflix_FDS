import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrl = environment.apiUrl;
  TOKEN_NAME = 'Token';

  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    // const headers = new HttpHeaders({ enctype: 'multipart/form-data' });

    return this.http.post<any>(`${this.apiUrl}/accounts/login/`, user);
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem(this.TOKEN_NAME));
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, JSON.stringify(token['token']));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }
}
