import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[fixHeader]',
})
export class FixHeaderDirective {
  lastScrollTop: number = 0;
  state: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  @HostListener('window:scroll', ['$event']) fix() {

    if (this.lastScrollTop > window.pageYOffset) this.state = 'up';
    else this.state = 'down';

    if (window.pageYOffset >= 10) {
      if (this.router.url === '/home') {
        // top: 0px; position: fixed; background: rgb(20, 20, 20);
        this.renderer.setStyle(this.el.nativeElement, 'top', '0');
        this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(
          this.el.nativeElement,
          'background',
          'rgb(20, 20, 20)'
        );
      } else {
        if (this.state === 'down') {
          // top: -68px; position: fixed; background: rgb(20, 20, 20);
          this.renderer.setStyle(this.el.nativeElement, 'top', '-68px');
          this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
          this.renderer.setStyle(
            this.el.nativeElement,
            'background',
            'rgb(20, 20, 20)'
          );
        } else {
          // top: -68px; position: fixed; background: rgb(20, 20, 20);
          this.renderer.setStyle(this.el.nativeElement, 'top', '0');
          this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
          this.renderer.setStyle(
            this.el.nativeElement,
            'background',
            'rgb(20, 20, 20)'
          );
        }
      }
    } else {
      // top: 0px; position: relative; background: transparent;
      this.renderer.setStyle(this.el.nativeElement, 'top', '0');
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
      this.renderer.setStyle(
        this.el.nativeElement,
        'background',
        'transparent'
      );
    }

    this.lastScrollTop = window.pageYOffset;
  }
}
