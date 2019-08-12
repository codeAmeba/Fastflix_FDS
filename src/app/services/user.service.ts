import { Injectable, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root"
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

    const headers = new HttpHeaders({}).set("Authorization", `Token ${token}`);

    return this.http.get<any>(`${this.apiUrl}/movies/profiles/setup/`, {
      headers
    });
  }

  getProfileImages(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({}).set("Authorization", `Token ${token}`);
    return this.http.get<any>(`${this.apiUrl}/accounts/change_profile/`, {
      headers
    });
  }

  initializeSubUser(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({}).set("Authorization", `Token ${token}`);

    console.log("sub_user_id:", this.authService.subUser.id);

    return this.http.post<any>(
      `${this.apiUrl}/accounts/visited_base_movies/`,
      {
        sub_user_id: this.authService.subUser.id
      },
      {
        headers
      }
    );
  }

  changeProfile(profileInfo: object): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({}).set("Authorization", `Token ${token}`);

    return this.http.patch<any>(
      `${this.apiUrl}/accounts/change_sub_user/`,
      profileInfo,
      {
        headers
      }
    );
  }

  removeProfile(subuserid: number): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({})
      .set("Authorization", `Token ${token}`)
      .set("subuserid", subuserid + "");

    return this.http.delete<any>(`${this.apiUrl}/accounts/delete_sub_user/`, {
      headers
    });
  }

  getSubUsers(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({}).set("Authorization", `Token ${token}`);

    return this.http.get<any>(`${this.apiUrl}/accounts/sub_user_list/`, {
      headers
    });
  }
}
