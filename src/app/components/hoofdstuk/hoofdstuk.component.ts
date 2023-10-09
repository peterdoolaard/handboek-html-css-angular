import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppSharedService } from "src/app/services/app-shared.service";
import { Subscription } from "rxjs";
import { Hoofdstuk } from "../../models";


@Component({
  selector: 'app-hoofdstuk',
  templateUrl: './hoofdstuk.component.html',
  styleUrls: ['./hoofdstuk.component.scss']
})
export class HoofdstukComponent implements OnInit, OnDestroy {
  hoofdstukken: Hoofdstuk[] = [];
  subs: Subscription = new Subscription();

  constructor(
    private sharedService: AppSharedService,
  ) {
  }

  ngOnInit() {
    this.subs.add(
      this.sharedService.getHoofdstukken().subscribe((hoofdstukken) => {
          this.hoofdstukken = hoofdstukken;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
