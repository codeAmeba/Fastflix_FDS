import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubUser } from 'src/app/models/sub-user';
import { Location } from '@angular/common';

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
  @Output() profileSelected = new EventEmitter();
  showDropDown: boolean;
  isHome: boolean;
  isSearch: boolean;
  searchValue: string;
  subUsers: SubUser[];
  subUser: SubUser;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.showDropDown = false;
    this.isSearch = this.router.url.slice(0, 7) === '/search' ? true : false;
    this.searchValue = '';
    this.isHome = this.router.url === '/home';
    this.subUsers = this.authService.getSubUsers();
    this.subUser = this.subUsers.find(
      ({ id }) => id === this.authService.getProfile()
    );
  }

  selectProfile(subUser: SubUser) {
    this.authService.setProfile(subUser.id);
    this.subUser = this.subUsers.find(
      ({ id }) => id === this.authService.getProfile()
    );
    this.ngOnInit();
    this.profileSelected.emit();
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
    if (!this.searchValue) {
      console.log('no search value');

      this.location.back();
    } else this.router.navigate([`search/${this.searchValue}`]);
    // if (this.searchValue === '') this.isSearch = false;

    // 값 있으면 searchValue로 검색
  }
}
