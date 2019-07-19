import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-step3',
  templateUrl: './signup-step3.component.html',
  styleUrls: ['./signup-step3.component.css'],
})
export class SignupStep3Component implements OnInit {
  profileForm: FormGroup;
  userName: string;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userName = this.userService.userName;

    this.profileForm = new FormGroup({
      ownerName: new FormControl(''),
      profile1Name: new FormControl(''),
      profile2Name: new FormControl(''),
      profile3Name: new FormControl(''),
      profile4Name: new FormControl(''),
    });
  }

  onSubmit() {
    const user = {
      name: this.profileForm.get('ownerName').value,
      kid: false,
    };
    this.userService.setProfile(user).subscribe(
      data => {
        console.log('success', data);
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
