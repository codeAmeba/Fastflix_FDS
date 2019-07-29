import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from './animations/fadeinout.animation';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  animations: [fadeAnimation],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  ngOnDestroy() {
    this.authService.logout();
  }
}
