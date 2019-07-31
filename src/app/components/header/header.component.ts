import { Component, OnInit } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubUser } from 'src/app/models/sub-user';

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
    trigger('slide', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ width: 0, opacity: 0 }),
        animate(200, style({ width: '212px', opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        style({ width: '212px', opacity: 1 }),
        animate(200, style({ width: 0, opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showDropDown: boolean;
  isHome: boolean;
  isSearch: boolean;
  searchValue: string;
  subUsers: SubUser[];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.showDropDown = false;
    this.isSearch = false;
    this.searchValue = '';
    this.isHome = this.router.url === '/home';
    this.subUsers = this.authService.getSubUsers();
  }

  selectProfile(subUser: SubUser) {
    this.authService.setProfile(subUser.id);
    window.location.reload();
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

  onBlur() {
    console.log(this.searchValue);
    this.isSearch = this.searchValue ? true : false;
    console.log(this.isSearch);
  }

  search() {
    console.log('search Input: ', this.searchValue);

    // if (this.searchValue === '') this.isSearch = false;

    // 값 있으면 searchValue로 검색
  }
}
