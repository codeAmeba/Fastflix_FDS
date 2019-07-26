import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { SubUser } from '../models/sub-user';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit {
  apiUrl = environment.apiUrl;
  userName: string;
  subUsers: SubUser[];
  PROFILE_NAME = 'PID';
  TOKEN_NAME = 'Token';

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit() {
    this.userName = '';
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem(this.TOKEN_NAME));
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, JSON.stringify(token['token']));
  }

  createProfile(user: UserProfile): Observable<UserProfile> {
    const token = this.getToken();

    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.post<UserProfile>(
      `${this.apiUrl}/accounts/create_sub_user/`,
      user,
      { headers }
    );
  }

  setProfile(profileId: any) {
    localStorage.setItem(this.PROFILE_NAME, JSON.stringify(profileId));
  }

  getProfile() {
    return JSON.parse(localStorage.getItem(this.PROFILE_NAME));
  }

  login(user: any): Observable<any> {
    // const headers = new HttpHeaders({ enctype: 'multipart/form-data' });

    return this.http.post<any>(`${this.apiUrl}/accounts/login/`, user);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.PROFILE_NAME);
  }
}
