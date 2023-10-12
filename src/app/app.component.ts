import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AppSharedService } from "./services/app-shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private sharedService: AppSharedService,
    private mainContent: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngAfterViewInit() {
    this.sharedService.classFixed$.subscribe(value => {
      if (value) {
        this.renderer.addClass(this.mainContent.nativeElement.querySelector('.main-content'), '__padding-top');
      }  else {
        this.renderer.removeClass(this.mainContent.nativeElement.querySelector('.main-content'), '__padding-top');
      }
    })
  }

}
