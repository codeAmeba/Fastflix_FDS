import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../../animations/slider.animation';

@Component({
  selector: 'app-signup',
  animations: [slideInAnimation],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    this.renderer.addClass(document.body.parentElement, 'signup');
    this.renderer.addClass(document.body, 'signup');
    if (this.router.url === '/signup') this.router.navigate(['signup/step1']);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body.parentElement, 'signup');
    this.renderer.removeClass(document.body, 'signup');
  }
}
