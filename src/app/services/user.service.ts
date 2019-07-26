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

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  signup(user: User): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/accounts/create_user/`, user);
  }
}
