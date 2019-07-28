import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  canActivate() {
    if (!this.authService.getToken()) {
      console.log('Please Login to Enter');
      this.router.navigate(['welcome']);
      return false;
    } else if (!this.authService.getProfile()) {
      console.log(this.authService.getProfile());

      console.log('Please Select Profile');
      this.router.navigate(['profile']);
      return false;
    }
    return true;
  }
}
