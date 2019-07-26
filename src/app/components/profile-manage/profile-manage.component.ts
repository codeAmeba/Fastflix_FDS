import { Component, OnInit } from '@angular/core';
import { SubUser } from 'src/app/models/sub-user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile-manage',
  templateUrl: './profile-manage.component.html',
  styleUrls: ['./profile-manage.component.css'],
})
export class ProfileManageComponent implements OnInit {
  isAdd: boolean;
  isChild: boolean;
  subUsers: SubUser[];

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
}
