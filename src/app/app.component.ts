import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AppSharedService } from "./services/app-shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
@ViewChild('pageWrapper') pageWrapper!: ElementRef;

  constructor(
    private sharedService: AppSharedService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    this.sharedService.classFixed$.subscribe(value => {
      if (value) {
        this.renderer.addClass(this.elementRef.nativeElement.querySelector('.main-content'), '__padding-top');
      }  else {
        this.renderer.removeClass(this.elementRef.nativeElement.querySelector('.main-content'), '__padding-top');
      }
    })

    const observeFixedNav = new ResizeObserver(this.resizeFixedNav);
    observeFixedNav.observe(this.pageWrapper.nativeElement);
  }

  resizeFixedNav(entries: ResizeObserverEntry[]) {
    entries.map(entry => {
      const navMain: HTMLElement | null = entry.target.querySelector('.nav-main');
      if(navMain) {
        document.documentElement.style.setProperty('--nav-main-inline-size', entry.borderBoxSize[0].inlineSize + 'px')
        navMain.style.inlineSize = entry.borderBoxSize[0].inlineSize + 'px';
      }


      // Alternatieve methode om geen inline style te hoeven maken
      // Meer onderzoek nodig
      // const sheets = document.styleSheets;
      // for (let i = 0; i < sheets.length; i++) {
      //   for (let j = 0; j < sheets[i].cssRules.length; j++) {
      //     if (sheets[i].cssRules[j].cssText.includes(':root'))
      //       sheets[i].replaceSync(`:root { --nav-main-inline-size: ${entry.borderBoxSize[0].inlineSize}px`)
      //   }
      // }

    })
  }
}
