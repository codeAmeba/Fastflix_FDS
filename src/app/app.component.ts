import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from './animations/fadeinout.animation';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  animations: [fadeAnimation],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  isHeaderNeed() {
    // Home, Movie, MyList, Search일 때만 header 필요
    if (this.router.url.slice(0, 7) === '/search') return true;
    return this.router.url === ('/home' || '/movie' || '/mylist')
      ? true
      : false;
  }

  ngOnDestroy() {
    this.authService.logout();
  }
}
