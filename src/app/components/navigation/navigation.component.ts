import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AppSharedService } from '../../services/app-shared.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {
  @ViewChild('navMain') navMain: ElementRef | undefined;

  constructor(
    private sharedService: AppSharedService,
    private renderer: Renderer2
  ) {
  }

  ngAfterViewInit() {
    this.sharedService.classFixed$.subscribe(value => {
      if (this.navMain) {
        if (value) {
          this.renderer.addClass(this.navMain.nativeElement, '__fixed');
        } else {
          this.renderer.removeClass(this.navMain.nativeElement, '__fixed');
        }
      }
    });
  }
}
