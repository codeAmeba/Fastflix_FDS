import { Component, OnInit } from '@angular/core';
import { SubUser } from 'src/app/models/sub-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  newProfileImage: string;
  addForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isAdd = false;
    this.isChild = false;
    this.getSubUsers();
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      kid: new FormControl(false),
    });
  }

  getSubUsers() {
    this.userService.getSubUsers().subscribe(subUsers => {
      this.authService.subUsers = subUsers.sort(
        (a: SubUser, b: SubUser) => a.id - b.id
      );
      this.subUsers = subUsers;
    });
    this.selectedUser = {
      id: 0,
      kid: false,
      name: '',
      parent_user: 0,
      profile_info: {},
    };
  }

  secondLogin(subUser: SubUser) {
    this.authService.subUser = subUser;
    this.router.navigate(['/home']);
  }

  tabAdd() {
    this.userService.getProfileImages().subscribe(response => {
      const random = Math.floor(Math.random() * (5 - 0)) + 0;
      this.newProfileImage = response.basic[random]['image_path'];
    });
    this.isAdd = true;
  }

  addProfile() {
    if (this.addForm.invalid) return;

    const names = [this.addForm.get('name').value];
    const kids = [this.addForm.get('kid').value];

    const user = {
      name: names,
      kid: kids,
    };

    this.authService.createProfile(user).subscribe(profiles => {
      this.authService.subUsers = profiles['sub_user_list'].sort(
        (a: SubUser, b: SubUser) => a.id - b.id
      );

      this.getSubUsers();

      this.isAdd = false;
    });
  }
}
