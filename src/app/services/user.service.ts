import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  signup(user: User): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/accounts/create_user/`, user);
  }

  getPreMovies(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({}).set('Authorization', `Token ${token}`);

    return this.http.get<any>(`${this.apiUrl}/movies/profiles/setup/`, {
      headers,
    });
  }
}
