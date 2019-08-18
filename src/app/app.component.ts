import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { fadeAnimation } from './animations/fadeinout.animation';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  animations: [fadeAnimation],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  showHeader: boolean;
  isSubHeader: boolean;
  isProfileHeader: boolean;
  isWelcomeHeader: boolean;
  isSelected: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isHeaderNeed();
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  fadein() {
    this.isSelected = true;

    setTimeout(() => {
      this.isSelected = false;
    }, 500);
  }

  isHeaderNeed() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        // Home, Movie, MyList, Search, Profile, Profile Manage일 때만 header 필요
        if (
          this.router.url.slice(0, 7) === '/search' ||
          this.router.url === '/home' ||
          this.router.url === '/movie' ||
          this.router.url === '/mylist' ||
          this.router.url === '/profile' ||
          this.router.url === '/profile/manage'
        )
          this.showHeader = true;
        else this.showHeader = false;

        if (this.router.url === '/movie' || this.router.url === '/mylist')
          this.isSubHeader = true;
        else this.isSubHeader = false;

        if (
          this.router.url === '/profile' ||
          this.router.url === '/profile/manage'
        )
          this.isProfileHeader = true;
        else this.isProfileHeader = false;

        this.isWelcomeHeader = this.router.url === '/welcome' ? true : false;
      }
    });
  }

  ngOnDestroy() {
    this.authService.logout();
  }
}
