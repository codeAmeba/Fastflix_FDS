import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup-step3',
  templateUrl: './signup-step3.component.html',
  styleUrls: ['./signup-step3.component.css'],
})
export class SignupStep3Component implements OnInit {
  profileForm: FormGroup;
  userName: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.userName = this.authService.userName;

    this.profileForm = new FormGroup({
      ownerName: new FormControl(''),
      profile1Name: new FormControl(''),
      profile2Name: new FormControl(''),
      profile3Name: new FormControl(''),
      profile4Name: new FormControl(''),
    });
  }

  onSubmit() {
    const names = [this.profileForm.get('ownerName').value || this.userName];
    const kids = [false];

    for (let i = 1; i < 5; i++) {
      if (this.profileForm.get(`profile${i}Name`).value) {
        names.push(this.profileForm.get(`profile${i}Name`).value);
        kids.push(false);
      }
    }

    const user = {
      name: names,
      kid: kids,
    };

    console.log(user);

    this.authService.createProfile(user).subscribe(
      profiles => {
        console.log('success', profiles['sub_user_list']);
        this.authService.setProfile(profiles['sub_user_list'][0].id);
        if (this.profileForm.get('ownerName').value)
          this.authService.userName = this.profileForm.get('ownerName').value;
        this.router.navigate(['/signup/step4']);
      },
      error => {
        console.error(error);
      }
    );
  }

  get ownerName() {
    return this.profileForm.get('ownerName').value;
  }
}
