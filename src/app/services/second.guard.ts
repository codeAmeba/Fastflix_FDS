import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class SecondGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate() {
    if (!this.authService.getToken()) {
      console.log('Please Login to Enter');
      this.router.navigate(['welcome']);
      return false;
    }
    return true;
  }
}
