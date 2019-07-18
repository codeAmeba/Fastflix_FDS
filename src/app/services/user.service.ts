import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  apiUrl = environment.apiUrl;
  userName: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.userName = '';
  }

  signup(user: User): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/accounts/create_user/`, user);
  }

  setProfile(user: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(
      `${this.apiUrl}/accounts/create_sub_user/`,
      user
    );
  }
}
