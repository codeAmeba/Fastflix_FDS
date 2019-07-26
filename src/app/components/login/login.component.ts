import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailHolderUp: boolean;
  pwHolderUp: boolean;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.body.parentElement, 'signup');
    this.renderer.addClass(document.body, 'signup');
    this.loginForm = new FormGroup({
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        // Validators.pattern(
        //   '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$'
        // ),
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
    // const user = new FormData();
    // user.append('id', this.loginForm.get('id').value);
    // user.append('pw', this.loginForm.get('password').value);

    const user = {
      id: this.loginForm.get('id').value,
      pw: this.loginForm.get('password').value,
    };

    this.authService.login(user).subscribe(response => {
      console.log('login response:', response);

      this.authService.setToken(response);
      this.authService.subUsers = response['sub_user_list'];
      // this.userService.setProfile(response['sub_user_list'][0].id);
      // this.userService.userName = response['sub_user_list'][0].name;

      if (response.token) this.router.navigate(['/home']);
    });
    // this.router.navigate(['subin/main']);
  }

  emailFocus(value: string) {
    this.emailHolderUp = value ? true : false;
  }

  pwFocus(value: string) {
    this.pwHolderUp = value ? true : false;
  }

  get id() {
    return this.loginForm.get('id');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body.parentElement, 'signup');
    this.renderer.removeClass(document.body, 'signup');
  }
}
