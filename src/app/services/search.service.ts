import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnInit {
  apiUrl = environment.apiUrl;
  searchQuery: string;
  beforeSearch: string;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.searchQuery = '';
    this.beforeSearch = '';
  }

  getSearchQuery() {
    return this.searchQuery;
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  rememberBefore(url: string) {
    this.beforeSearch = url;
  }

  searchMovies(query: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    const params = new HttpParams().set('search_key', query);

    return this.http.get<any>(`${this.apiUrl}/movies/search/`, {
      headers,
      params,
    });
  }
}
