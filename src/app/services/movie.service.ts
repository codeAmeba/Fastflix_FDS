import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  getMainMovie(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.userService.getProfile()+'');

    console.log(headers);

    return this.http.get<any>(`${this.apiUrl}/movies/genre_select_before/`, { headers});
  }
}
