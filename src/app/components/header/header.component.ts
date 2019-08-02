import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewChecked,
} from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubUser } from 'src/app/models/sub-user';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

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
export class HeaderComponent implements OnInit, AfterViewChecked {
  @Output() profileSelected = new EventEmitter();
  showDropDown: boolean;
  isSubHeader: boolean;
  isSearch: boolean;
  searchValue: string;
  subUsers: SubUser[];
  subUser: SubUser;
  navigationSubscription;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private searchService: SearchService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.showDropDown = false;
    this.isSearch = this.router.url.slice(0, 7) === '/search' ? true : false;
    this.searchValue = this.isSearch ? this.searchService.getSearchQuery() : '';
    this.isHeaderNeed();
    this.getSubUsers();

    console.log('subHeader', this.isSubHeader);

    if (document.getElementById('#searchInput') && this.isSearch)
      document.getElementById('#searchInput').focus();
  }

  ngAfterViewChecked() {
    if (document.getElementById('#searchInput') && this.isSearch)
      document.getElementById('#searchInput').focus();
  }

  isHeaderNeed() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        // Home, Movie, MyList, Search일 때만 header 필요
        if (this.router.url === '/movie' || this.router.url === '/mylist')
          this.isSubHeader = true;
        else this.isSubHeader = false;
      }
    });
  }

  getSubUsers() {
    this.userService.getSubUsers().subscribe(subUsers => {
      this.authService.subUsers = subUsers.sort((a, b) => a.id - b.id);
      this.subUsers = subUsers;
      this.subUser = this.authService.subUser;
      console.log('get subUsers', this.authService.subUsers);
    });
  }

  selectProfile(subUser: SubUser) {
    this.authService.subUser = subUser;
    this.subUser = subUser;
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
    this.isSearch = this.searchValue ? true : false;
  }

  search() {
    console.log('search Input: ', this.searchValue);
    if (!this.searchValue && this.router.url.slice(0, 7) === '/search') {
      console.log(
        'no search value! go back to',
        this.searchService.beforeSearch
      );
      this.router.navigate([this.searchService.beforeSearch]);
    } else {
      if (this.router.url.slice(0, 7) !== '/search') {
        console.log('remember now', this.router.url);
        this.searchService.rememberBefore(this.router.url);
      }
      this.searchService.setSearchQuery(this.searchValue);
      this.router.navigate([`search/${this.searchValue}`]);
    }
  }
}
