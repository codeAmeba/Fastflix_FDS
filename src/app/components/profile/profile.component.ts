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
  isManage: boolean;
  subUsers: SubUser[];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.subUsers = this.authService.subUsers;
    console.log(this.subUsers);
  }

  secondLogin(id: number) {
    this.authService.setProfile(id);
    this.router.navigate(['home']);
  }
}
