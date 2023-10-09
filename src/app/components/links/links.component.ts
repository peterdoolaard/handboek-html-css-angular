import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppSharedService } from "../../services/app-shared.service";
import { Link } from "../../models";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  links: Link[] = [];

  constructor(
    private sharedService: AppSharedService,
  ) {
  }

  ngOnInit() {
    this.subs.add(
      this.sharedService.getLinks().subscribe(links => {
          this.links = links
          console.log(this.links)
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
