import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts/login/`, user);
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem(this.TOKEN_NAME));
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, JSON.stringify(token['token']));
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }
}
