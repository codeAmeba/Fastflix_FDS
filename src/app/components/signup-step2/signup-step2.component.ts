import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup-step2',
  templateUrl: './signup-step2.component.html',
  styleUrls: ['./signup-step2.component.css'],
})
export class SignupStep2Component implements OnInit {
  signupForm: FormGroup;
  // nameHolderUp: boolean;
  // emailHolderUp: boolean;
  // pwHolderUp: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      ownername: new FormControl('', [Validators.required]),
      email: new FormControl('', [
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
    // this.nameHolderUp = false;
    // this.emailHolderUp = false;
    // this.pwHolderUp = false;
  }

  onSubmit() {
    const user = {
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
    };

    this.userService.signup(user).subscribe(
      data => {
        const loginData = {
          id: this.signupForm.get('email').value,
          pw: this.signupForm.get('password').value,
        };
        // const loginData = new FormData();
        // loginData.append('id', this.signupForm.get('email').value);
        // loginData.append('pw', this.signupForm.get('password').value);

        // 회원가입 계정으로 로그인을 해서 Token을 받아와야 프로필 생성 가능
        this.authService.login(loginData).subscribe(token => {
          this.authService.setToken(token);
          this.router.navigate(['/signup/step3']);
        });

        this.authService.userName = this.signupForm.get('ownername').value;
      },
      error => {
        console.log(error);
        if (error.status === 500)
          this.signupForm.get('email').setErrors({ exist: error });
      }
    );
  }

  // nameFocus(value: string) {
  //   this.nameHolderUp = value ? true : false;
  // }

  // emailFocus(value: string) {
  //   this.emailHolderUp = value ? true : false;
  // }

  // pwFocus(value: string) {
  //   this.pwHolderUp = value ? true : false;
  // }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get ownername() {
    return this.signupForm.get('ownername');
  }
}
