import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppSharedService } from "../../services/app-shared.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HeaderComponent {

  constructor(
    private sharedService: AppSharedService,
  ) {
  }

  ngAfterViewInit() {
    const element = document.querySelector('h1') as Element;
    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        console.log(entry)
        if (entry.isIntersecting) {
          entry.target.classList.add('blue');
          this.sharedService.navIsFixed(false);
        } else {
          entry.target.classList.remove('blue');
          this.sharedService.navIsFixed(true);
        }
      })
    }, {threshold: 0});
    console.log(element);
    intersectionObserver.observe(element);
  }

}
