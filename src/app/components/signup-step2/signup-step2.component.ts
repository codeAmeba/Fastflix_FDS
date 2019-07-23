import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-step2',
  templateUrl: './signup-step2.component.html',
  styleUrls: ['./signup-step2.component.css'],
})
export class SignupStep2Component implements OnInit {
  signupForm: FormGroup;
  nameHolderUp: boolean;
  emailHolderUp: boolean;
  pwHolderUp: boolean;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      ownername: new FormControl('', [Validators.required]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.pattern(
          '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$'
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(60),
      ]),
    });
    this.nameHolderUp = false;
    this.emailHolderUp = false;
    this.pwHolderUp = false;
  }

  onSubmit() {
    const user = {
      username: this.signupForm.get('username').value,
      password: this.signupForm.get('password').value,
    };
    this.userService.signup(user).subscribe(
      data => {
        this.userService.userName = this.signupForm.get('ownername').value;
        console.log(this.userService.userName);
        this.router.navigate(['/signup/step3']);
      },
      error => {
        this.signupForm.get('username').setErrors({ exist: true });
      }
    );
  }

  nameFocus(value: string) {
    this.nameHolderUp = value ? true : false;
  }

  emailFocus(value: string) {
    this.emailHolderUp = value ? true : false;
  }

  pwFocus(value: string) {
    this.pwHolderUp = value ? true : false;
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get ownername() {
    return this.signupForm.get('ownername');
  }
}
