import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
} from '@angular/core';
import { MovieCategories } from 'src/app/models/movieCategories';

@Directive({
  selector: '[Moveupdown]',
})
export class MoveupdownDirective {
  @Input() category: string;
  @Input() openedCategory: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  isDown() {
    if (!this.openedCategory) return false;

    const categories = MovieCategories.map(({ category }) => category);

    return (
      categories.indexOf(this.category) >
      categories.indexOf(this.openedCategory)
    );
  }

  @HostListener('click') move() {
    const slider = this.el.nativeElement.closest('.slider');
    const sliderTop = slider.getBoundingClientRect().top;
    const mainView = this.el.nativeElement.closest('.mainView');
    const thanos = document.querySelector('.thanos');
    const header = document.querySelector('.header-container');

    const detailHeight = document
      .querySelector('.jawBoneContainer')
      .getBoundingClientRect().height;

    const setTransition = (offset: number, smooth: boolean) => {
      this.renderer.setStyle(
        mainView,
        'transform',
        `translate3d(0px, -${offset}px, 0px)`
      );
      this.renderer.setStyle(mainView, 'transition-duration', '540ms');
      this.renderer.setStyle(mainView, 'transition-delay', '50ms');

      setTimeout(() => {
        this.renderer.removeStyle(mainView, 'transform');
        this.renderer.removeStyle(mainView, 'transition-duration');
        this.renderer.removeStyle(mainView, 'transition-delay');

        window.scroll({
          top: window.pageYOffset + offset,
          left: 0,
          behavior: smooth ? 'smooth' : 'auto',
        });

        this.renderer.setStyle(header, 'top', '0');
        this.renderer.setStyle(header, 'position', 'fixed');
        this.renderer.setStyle(header, 'background', 'rgb(20, 20, 20)');
      }, 600);
    };

    if (thanos.classList.contains('has-open-jaw') && this.isDown()) {
      // 열려있고 아래에 있으면
      // console.log('Has open jaw and down');
      setTransition(sliderTop - 70 - detailHeight, true);
    } else {
      // 열려있지 않거나 위에 있으면
      // console.log('No open jaw or up');

      setTransition(sliderTop - 70, false);
    }
  }
}
