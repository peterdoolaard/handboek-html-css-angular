import { Component, OnInit } from '@angular/core';
import { AppSharedService } from "../../services/app-shared.service";
import { Link } from "../../models";
import { from, mergeMap, Observable, toArray } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  links: Link[] = [];
  currentChapter: number = 1;


  constructor(
    private sharedService: AppSharedService,
  ) {
  }

  ngOnInit() {
      this.sharedService.getLinks()
        .pipe(
          mergeMap((links: Link[]): Observable<Link> => from(links)),
          filter((item: Link) => item.hoofdstukNummer === this.currentChapter),
          toArray()
        ).subscribe((value: Link[]) => this.links = value)
  }
}
