import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(document.body.parentElement, 'signup');
    this.renderer.addClass(document.body, 'signup');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body.parentElement, 'signup');
    this.renderer.removeClass(document.body, 'signup');
  }
}
