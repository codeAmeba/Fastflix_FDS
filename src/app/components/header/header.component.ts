import { Component, OnInit } from '@angular/core';
import {
  style,
  state,
  animate,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(150, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(150, style({ opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showDropDown: boolean;
  isHome: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.showDropDown = false;
    this.isHome = this.router.url === '/home';
  }

  showMenu(event: HTMLElement) {
    this.showDropDown = true;
  }

  hideMenu(event: HTMLElement) {
    this.showDropDown = false;
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['welcome']);
  }
}
