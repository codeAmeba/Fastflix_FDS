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
    private authService: AuthenticationService
  ) {}

  getMainMovie(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.getProfile() + '');

    console.log(headers);

    return this.http.get<any>(`${this.apiUrl}/movies/genre_select_before/`, {
      headers,
    });
  }

  getMovieDetail(id: number): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.getProfile() + '');

    return this.http.get<any>(`${this.apiUrl}/movies/${id}/`, { headers });
  }

  likeMovie(movieid: number): Observable<any> {
    const subuserid = this.authService.getProfile();
    const token = this.authService.getToken();

    const headers = new HttpHeaders({}).set('Authorization', `Token ${token}`);
    return this.http.post<any>(
      `${this.apiUrl}/movies/like/`,
      {
        movieid,
        subuserid,
      },
      { headers }
    );
  }

  dislikeMovie(movieid: number): Observable<any> {
    const subuserid = this.authService.getProfile();
    const token = this.authService.getToken();

    const headers = new HttpHeaders({}).set('Authorization', `Token ${token}`);
    return this.http.post<any>(
      `${this.apiUrl}/movies/dislike/`,
      {
        movieid,
        subuserid,
      },
      { headers }
    );
  }

  myList(movieid: number): Observable<any> {
    const subuserid = this.authService.getProfile();
    const token = this.authService.getToken();

    const headers = new HttpHeaders({}).set('Authorization', `Token ${token}`);
    return this.http.post<any>(
      `${this.apiUrl}/movies/add_delete_my_list/`,
      {
        movieid,
        subuserid,
      },
      { headers }
    );
  }
}
