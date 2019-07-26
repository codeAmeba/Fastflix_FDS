import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { SubUser } from 'src/app/models/sub-user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile-manage',
  templateUrl: './profile-manage.component.html',
  styleUrls: ['./profile-manage.component.css'],
})
export class ProfileManageComponent implements OnInit {
  tabState: string;
  isChild: boolean;
  subUsers: SubUser[];
  selectedUser: SubUser;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.tabState = '';
    this.isChild = false;
    this.subUsers = this.authService.subUsers;
    console.log(this.subUsers);
  }

  secondLogin(id: number) {
    this.authService.setProfile(id);
    this.router.navigate(['home']);
  }

  changeProfile() {
    if (!this.selectedUser) return;

    console.log(this.selectedUser);

    const name = this.selectedUser.name;
  }
}
