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
  emailHolderUp: boolean;
  pwHolderUp: boolean;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
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

    this.emailHolderUp = false;
    this.pwHolderUp = false;
  }

  onSubmit() {
    const user = this.signupForm.value;
    this.userService.signup(user).subscribe(
      data => {
        this.router.navigate(['login']);
      },
      error => {
        this.signupForm.get('username').setErrors({ exist: true });
      }
    );
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
}
