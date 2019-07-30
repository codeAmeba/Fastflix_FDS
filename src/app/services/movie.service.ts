import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  // Home View 구성 Movies

  getHomeMain(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.getProfile() + '');

    console.log(headers);

    return this.http.get<any>(`${this.apiUrl}/movies/`, {
      headers,
    });
  }

  getBigMovie(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.getProfile() + '');

    console.log(headers);

    return this.http.get<any>(`${this.apiUrl}/movies/big_size_video/`, {
      headers,
    });
  }

  // Movie View 구성 Movies

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

  // Slider에서 Detail Open 시 Detail 요청

  getMovieDetail(id: number): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set('Authorization', `Token ${token}`)
      .set('subuserid', this.authService.getProfile() + '');

    return this.http.get<any>(`${this.apiUrl}/movies/${id}/`, { headers });
  }

  // 좋아요, 싫어요, 내가 찜 한 목록

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
