import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appIntersectionObserver]'
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {

    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        console.log('entry',entry)
        if (entry.isIntersecting) {
          console.log(this.elementRef);
          this.renderer.addClass(this.elementRef.nativeElement, 'blue')
        }
        if (!entry.isIntersecting) {
          console.log(this.elementRef);
          this.renderer.removeClass(this.elementRef.nativeElement, 'blue')
        }
      })
    }, {threshold: 1});
    intersectionObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
  }
}
