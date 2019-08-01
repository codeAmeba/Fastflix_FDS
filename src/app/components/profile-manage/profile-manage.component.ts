import { Component, OnInit } from '@angular/core';
import { SubUser } from 'src/app/models/sub-user';
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
  newProfileImage: string;
  nameChanged: boolean;
  kidChanged: boolean;
  imageChanged: boolean;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.tabState = '';
    this.isChild = false;
    this.getSubUsers();
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      kid: new FormControl(false),
    });
    this.changeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      kid: new FormControl(false),
    });
    this.nameChanged = false;
    this.kidChanged = false;
    this.imageChanged = false;
  }

  // 해당 계정의 모든 SubUser를 다시 가져와서 LocalStorage에 저장
  // this.subUsers에도 새로 반영
  // selectedUser 초기화
  getSubUsers() {
    this.userService.getSubUsers().subscribe(subUsers => {
      console.log(subUsers.sort((a, b) => a.id - b.id));
      this.authService.setSubUsers(subUsers.sort((a, b) => a.id - b.id));
      this.subUsers = subUsers;
      // this.subUsers = this.authService.getSubUsers();
      console.log('get subUsers', this.authService.getSubUsers());
    });
    this.selectedUser = {
      id: 0,
      kid: false,
      name: '',
      parent_user: 0,
      profile_info: {},
    };
  }

  // 사용자가 Profile 클릭 시 선택된 subUser 저장
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

  // Profile Add로 전환
  tabAdd() {
    this.userService.getProfileImages().subscribe(response => {
      const random = Math.floor(Math.random() * (5 - 0)) + 0;
      this.newProfileImage = response.basic[random]['image_path'];
    });
    this.tabState = 'add';
  }

  // Profile Add (name, kid 필수)
  // 반영된 subUsers를 다시 가져오고 selectedUser 초기화
  addProfile() {
    if (this.addForm.invalid) return;

    const names = [this.addForm.get('name').value];
    const kids = [this.addForm.get('kid').value];

    const user = {
      name: names,
      kid: kids,
    };

    this.authService.createProfile(user).subscribe(profiles => {
      console.log('success', profiles['sub_user_list']);

      this.authService.setSubUsers(
        profiles['sub_user_list'].sort((a, b) => a.id - b.id)
      );

      console.log('after added', this.authService.getSubUsers());

      // this.subUsers = this.authService.getSubUsers();
      this.getSubUsers();

      this.tabState = '';
    });
  }

  // Profile 삭제 클릭시 화면 전환
  tabDelete() {
    this.tabState = 'delete';
  }

  // Profile 삭제
  // 반영된 subUsers를 다시 가져오고 selectedUser 초기화
  removeProfile() {
    this.userService.removeProfile(this.selectedUser.id).subscribe(response => {
      console.log('remove', response);
      this.getSubUsers();
      this.tabState = '';
    });
  }

  // selectedUser와 tempUser를 비교해서 변경되었는지 state 관리
  isChanged() {
    this.nameChanged =
      this.selectedUser.name === this.tempUser.name ? false : true;

    this.kidChanged =
      this.selectedUser.kid === this.tempUser.kid ? false : true;

    this.imageChanged =
      this.selectedUser['profile_info']['profile_image_path'] ===
      this.tempUser.profile_image_path
        ? false
        : true;
  }

  // Profile 변경 시 Image 선택 페이지로 전환
  // 우선 tempUser에 변경사항 저장하고 변경 state update
  changeProfile() {
    if (!this.selectedUser) return;
    this.userService.getProfileImages().subscribe(
      response => {
        this.tempUser.name =
          this.changeForm.get('name').value || this.tempUser.name;

        this.tempUser.kid = this.changeForm.get('kid').value;

        this.isChanged();

        console.log('tempUser', this.tempUser);

        this.tabState = 'profileImage';

        this.standardIcons = response['대표 아이콘'];

        this.profileCategories = response.logo.map(category => {
          return {
            name: category.name,
            logo: category['image_path'],
            images: response[category.name],
          };
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  // Profile 선택 시 임시 User에 선택된 Image 저장
  profileImageSelected(selectedIcon: ProfileImage) {
    this.tempUser.profile_image_path = selectedIcon.image_path;
    this.isChanged();
    this.tabState = 'confirm';
  }

  // Profile Image 변경 확인
  confirmProfileImage() {
    // this.selectedUser['profile_info'][
    //   'profile_image_path'
    // ] = this.tempUser.profile_image_path;

    // this.selectedUser.name = this.tempUser.name;
    // this.selectedUser.kid = this.tempUser.kid;
    this.imageChanged = true;
    this.tabState = 'change';
  }

  // Profile Image 변경 취소
  cancelProfileImage() {
    // this.tempUser.profile_image_path = this.selectedUser['profile_info'][
    //   'profile_image_path'
    // ];
    this.imageChanged = false;
    this.tabState = 'profileImage';
  }

  saveProfile() {
    if (!this.nameChanged && !this.kidChanged && !this.imageChanged) return;

    this.nameChanged =
      this.selectedUser.name !== this.changeForm.get('name').value
        ? true
        : false;

    this.tempUser.name = this.isChanged
      ? this.changeForm.get('name').value
      : this.selectedUser.name;

    const profileInfo = {};
    if (this.nameChanged) profileInfo['name'] = this.tempUser.name;
    if (this.kidChanged) profileInfo['kid'] = this.tempUser.kid;
    if (this.imageChanged)
      profileInfo['profile_image_path'] = this.tempUser.profile_image_path;

    console.log('pre change profile', profileInfo);

    this.userService.changeProfile(profileInfo).subscribe(
      ({ response }) => {
        console.log('save Profile OK', response);
        if (!response) console.log('save Profile FAIL', response);
        this.userService.getSubUsers().subscribe(subUsers => {
          this.authService.setSubUsers(subUsers.sort((a, b) => a.id - b.id));
          this.getSubUsers();
          this.tabState = '';
        });
      },
      error => {
        console.error(error);
      }
    );
  }
}
