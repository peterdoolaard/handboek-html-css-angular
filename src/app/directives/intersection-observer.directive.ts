import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appIntersectionObserver]'
})
export class IntersectionObserverDirective implements OnInit {

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {

    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.elementRef.nativeElement, 'blue');
        }
        if (!entry.isIntersecting) {
          this.renderer.removeClass(this.elementRef.nativeElement, 'blue');
        }
      });
    }, {threshold: 1});
    intersectionObserver.observe(this.elementRef.nativeElement);
  }
}
