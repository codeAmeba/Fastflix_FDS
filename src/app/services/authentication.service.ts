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
  _subUsers: SubUser[];
  _subUser: SubUser;
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

    console.log('create user', user);

    return this.http.post<UserProfile>(
      `${this.apiUrl}/accounts/create_sub_user/`,
      user,
      { headers }
    );
  }

  // setProfile(profileId: any) {
  //   this.subUser = this.subUsers.find(({ id }) => id === profileId);
  //   localStorage.setItem(this.PROFILE_NAME, JSON.stringify(profileId));
  // }

  // getProfile() {
  //   return JSON.parse(localStorage.getItem(this.PROFILE_NAME));
  // }

  set subUser(subUser: SubUser) {
    localStorage.setItem(this.PROFILE_NAME, JSON.stringify(subUser.id));
    this._subUser = subUser;
  }

  get subUser() {
    const subUserId = JSON.parse(localStorage.getItem(this.PROFILE_NAME));
    this._subUser = this.subUsers.find(({ id }) => id === subUserId);
    return this._subUser;
  }

  set subUsers(subUsers: SubUser[]) {
    localStorage.setItem(this.PROFILES_NAME, JSON.stringify(subUsers));
    this._subUsers = subUsers;
  }

  get subUsers(): SubUser[] {
    this._subUsers = JSON.parse(localStorage.getItem(this.PROFILES_NAME));
    return this._subUsers;
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
