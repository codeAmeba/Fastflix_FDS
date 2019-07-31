import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
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
  PROFILES_NAME = 'PUSERS';
  MAINTAIN = 'Maintain';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.userName = '';
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem(this.TOKEN_NAME));
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, JSON.stringify(token));
  }

  createProfile(user: UserProfile): Observable<UserProfile> {
    const token = this.getToken();

    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    console.log('user', user);

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

  setSubUsers(subUsers: SubUser[]) {
    localStorage.setItem(this.PROFILES_NAME, JSON.stringify(subUsers));
  }

  getSubUsers(): SubUser[] {
    return JSON.parse(localStorage.getItem(this.PROFILES_NAME));
  }

  setMaintainance(isMaintain: boolean) {
    localStorage.setItem(this.MAINTAIN, JSON.stringify(isMaintain));
  }

  getMaintainance(): string {
    return JSON.parse(localStorage.getItem(this.MAINTAIN));
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts/login/`, user);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.PROFILE_NAME);
    localStorage.removeItem(this.PROFILES_NAME);
    localStorage.removeItem(this.MAINTAIN);
  }
}
