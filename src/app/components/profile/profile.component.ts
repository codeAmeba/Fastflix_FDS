import { Component, OnInit } from '@angular/core';
import { SubUser } from 'src/app/models/sub-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isAdd: boolean;
  isChild: boolean;
  subUsers: SubUser[];
  selectedUser: SubUser;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.isAdd = false;
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
