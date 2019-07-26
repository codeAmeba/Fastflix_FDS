import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup-step4',
  templateUrl: './signup-step4.component.html',
  styleUrls: ['./signup-step4.component.css'],
})
export class SignupStep4Component implements OnInit {
  activeSubmit: boolean;
  animate: boolean;
  count: number;
  userName: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activeSubmit = false;
    this.animate = false;
    this.count = 0;
    this.userName = this.authService.userName;
  }

  toggleSelected(event: HTMLSpanElement) {
    const target = <HTMLElement>event.closest('.box');
    if (this.count < 3 && target.classList.contains('not-selected')) {
      this.count += 1;

      target.classList.add('selected');
      target.classList.remove('not-selected');
    } else if (target.classList.contains('selected')) {
      this.count -= 1;

      target.classList.add('not-selected');
      target.classList.remove('selected');
    }

    this.activeSubmit = this.count === 3 ? true : false;
    this.animateCounter();
    console.log(this.count, this.activeSubmit);
  }

  animateCounter() {
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
    }, 500);
  }

  onSubmit() {
    this.router.navigate(['/home']);
  }
}
