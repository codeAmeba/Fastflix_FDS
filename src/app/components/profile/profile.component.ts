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
    this.subUsers = this.authService.getSubUsers();
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      kid: new FormControl(false),
    });
    console.log(this.subUsers);
  }

  secondLogin(id: number) {
    this.authService.setProfile(id);
    this.router.navigate(['home']);
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

    const user = {
      name: [this.addForm.get('name').value],
      kid: [this.addForm.get('kid').value],
    };

    console.log(user);

    this.authService.createProfile(user).subscribe(response => {
      this.authService.setSubUsers(
        response['sub_user_list'].sort((a, b) => a.id - b.id)
      );
      console.log(this.authService.getSubUsers());
      this.subUsers = this.authService.getSubUsers();
      this.isAdd = false;
    });
  }
}
