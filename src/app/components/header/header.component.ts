import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewChecked,
  Input,
} from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubUser } from 'src/app/models/sub-user';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

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
  @Output() genreSelected = new EventEmitter();
  showDropDown: boolean;
  @Input() isSubHeader: boolean;
  isSearch: boolean;
  searchValue: string;
  subUsers: SubUser[];
  subUser: SubUser;
  navigationSubscription: Subscription;
  timeout;

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
    this.getSubUsers();

    if (document.getElementById('#searchInput') && this.isSearch)
      document.getElementById('#searchInput').focus();
  }

  ngAfterViewChecked() {
    if (document.getElementById('#searchInput') && this.isSearch)
      document.getElementById('#searchInput').focus();
  }

  getSubUsers() {
    this.userService.getSubUsers().subscribe(subUsers => {
      this.authService.subUsers = subUsers.sort((a, b) => a.id - b.id);
      this.subUsers = subUsers;
      this.subUser = this.authService.subUser;
      console.log('get subUsers', this.authService.subUsers);
      console.log('Current subUser', this.subUser.name);
    });
  }

  selectProfile(subUser: SubUser) {
    this.authService.subUser = subUser;
    this.subUser = subUser;
    this.ngOnInit();
    this.profileSelected.emit();
  }

  selectGenre() {
    this.genreSelected.emit();
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
    // 500ms 이내에 다시 keyup event 시 search 안 함 (입력중이기 때문에)
    clearTimeout(this.timeout);

    if (!this.searchValue && this.router.url.slice(0, 7) === '/search') {
      // search 창에서 검색어 없을 시 이전 화면으로 돌아감
      console.log(
        'no search value! go back to',
        this.searchService.beforeSearch
      );
      this.router.navigate([this.searchService.beforeSearch]);
    } else {
      // input Value가 있을 경우
      if (this.router.url.slice(0, 7) !== '/search') {
        // 처음 search로 이동할 때 현재의 routing 주소 저장
        this.searchService.rememberBefore(this.router.url);
      }
      // 입력이 안 끝났을 때 search를 방지하기 위해서 500ms 이후에 search => error 적어짐
      this.timeout = setTimeout(() => {
        this.searchService.setSearchQuery(this.searchValue);
        this.router.navigate([`search/${this.searchValue}`]);
      }, 500);
    }
  }
}
