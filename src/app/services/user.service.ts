import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  signup(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts/create_user/`, user);
  }
}
