import { Component, OnInit } from '@angular/core';
import { SubUser } from 'src/app/models/sub-user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ProfileImage } from 'src/app/models/profile-image';

interface ProfileCategory {
  name: string;
  logo: string;
  images: ProfileImage[];
}

interface TempUser {
  name?: string;
  kid?: boolean;
  profile_image_path?: string;
}

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
  tempUser: TempUser;
  addForm: FormGroup;
  changeForm: FormGroup;
  profileCategories: ProfileCategory[];
  standardIcons: ProfileImage[];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.tabState = '';
    this.isChild = false;
    this.subUsers = this.authService.getSubUsers();
    this.selectedUser = {
      id: 0,
      kid: false,
      name: '',
      parent_user: 0,
      profile_info: {},
    };
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      kid: new FormControl(false),
    });
    this.changeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      kid: new FormControl(false),
    });
  }

  // secondLogin(id: number) {
  //   this.authService.setProfile(id);
  //   this.router.navigate(['home']);
  // }

  selectUser(subUser: SubUser) {
    this.selectedUser = subUser;
    this.tempUser = {
      name: this.selectedUser.name,
      kid: this.selectedUser.kid,
      profile_image_path: this.selectedUser['profile_info'][
        'profile_image_path'
      ],
    };
    console.log('selectedUser', this.selectedUser);
  }

  addProfile() {
    if (this.addForm.invalid) return;
    console.log(this.addForm.value);
    const user = {
      name: this.addForm.get('name').value,
      kid: this.addForm.get('kid').value,
    };
    this.authService.createProfile(user).subscribe(response => {
      this.authService.setSubUsers(response['sub_user_list']);
      console.log(this.authService.getSubUsers());
    });
  }

  changeProfile() {
    if (!this.selectedUser) return;
    this.userService.getProfileImages().subscribe(
      response => {
        this.tempUser.name =
          this.changeForm.get('name').value || this.tempUser.name;
        this.tabState = 'profileImage';
        console.log(response);

        this.standardIcons = response['대표 아이콘'];

        this.profileCategories = response.logo.map(category => {
          return {
            name: category.name,
            logo: category['image_path'],
            images: response[category.name],
          };
        });

        console.log(this.profileCategories);
      },
      error => {
        console.error(error);
      }
    );
  }

  profileImageSelected(selectedIcon: ProfileImage) {
    console.log(selectedIcon);
    this.tempUser.profile_image_path = selectedIcon.image_path;
    console.log('tempUser', this.tempUser);

    this.tabState = 'confirm';
  }

  confirmProfileImage() {
    this.selectedUser['profile_info'][
      'profile_image_path'
    ] = this.tempUser.profile_image_path;
    this.selectedUser.name = this.tempUser.name;
    this.selectedUser.kid = this.tempUser.kid;
    this.tabState = 'change';
  }

  cancelProfileImage() {
    this.tempUser.profile_image_path = this.selectedUser['profile_info'][
      'profile_image_path'
    ];
    this.tabState = 'profileImage';
  }

  saveProfile() {
    this.selectedUser.name =
      this.changeForm.get('name').value || this.selectedUser.name;

    const profileInfo = {
      sub_user_id: this.selectedUser.id,
      name: this.selectedUser.name,
      kid: this.selectedUser.kid,
      profile_image_path: this.selectedUser['profile_info'][
        'profile_image_path'
      ],
    };

    this.userService.changeProfile(profileInfo).subscribe(response => {
      console.log(response);
    });
    console.log(this.selectedUser);
  }
}
