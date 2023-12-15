import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppSharedService } from './services/app-shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('pageWrapper') pageWrapper!: ElementRef;
  @ViewChild('toTop') toTop!: ElementRef;

  currentUrl: string = '';

  constructor(
    private sharedService: AppSharedService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public router: Router
  ) {
    // TODO find a solution for the voorbeelden?hoofdstuk=1 path
    // router.events.subscribe((e) => {
    //   if (e instanceof NavigationEnd) {
    //     if (e.url.indexOf('hoofdstuk')) {
    //       this.currentUrl = '/voorbeelden';
    //     } else if (e.url !== '') {
    //       this.currentUrl = e.url;
    //     } else {
    //       this.currentUrl = '';
    //     }
    //   }
    // });
  }

  ngAfterViewInit() {
    this.sharedService.classFixed$.subscribe((value) => {
      if (value) {
        this.renderer.addClass(this.elementRef.nativeElement.querySelector('.main-content'), '__padding-top');
        this.renderer.addClass(this.toTop.nativeElement, '__show');
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement.querySelector('.main-content'), '__padding-top');
        this.renderer.removeClass(this.toTop.nativeElement, '__show');
      }
    });

    const observeFixedNav = new ResizeObserver(this.resizeFixedNav);
    observeFixedNav.observe(this.pageWrapper.nativeElement);
  }

  resizeFixedNav(entries: ResizeObserverEntry[]) {
    entries.map((entry) => {
      const navMain: HTMLElement | null = entry.target.querySelector('.nav-main');
      if (navMain) {
        document.documentElement.style.setProperty('--nav-main-inline-size', entry.borderBoxSize[0].inlineSize + 'px');
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
    });
  }

  scrollToTop(event: MouseEvent) {
    event.preventDefault();
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
