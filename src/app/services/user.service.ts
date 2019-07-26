import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile';
import { AuthenticationService } from './authentication.service';
import { SubUser } from '../models/sub-user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  apiUrl = environment.apiUrl;
  userName: string;
  subUsers: SubUser[];
  PROFILE_NAME = 'PID';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.userName = '';
  }

  signup(user: User): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/accounts/create_user/`, user);
  }

  createProfile(user: UserProfile): Observable<UserProfile> {
    const token = this.authService.getToken();

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
}
