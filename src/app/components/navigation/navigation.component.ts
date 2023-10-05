import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {AppSharedService } from "../../services/app-shared.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  constructor(
    private sharedService: AppSharedService,
    private navMain: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.sharedService.setClassFixed$.subscribe(value => {
      if (value) {
        this.renderer.addClass(this.navMain.nativeElement.firstElementChild, '__fixed');
      }  else {
        this.renderer.removeClass(this.navMain.nativeElement.firstElementChild, '__fixed');
      }
    })
  }

}
