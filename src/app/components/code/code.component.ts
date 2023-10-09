import { Component, OnInit } from '@angular/core';
import { AppSharedService } from "../../services/app-shared.service";
import { from, mergeMap, Observable, toArray } from "rxjs";
import { Voorbeeld } from "../../models";
import { filter } from "rxjs/operators";


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {
  voorbeelden: Voorbeeld[] = [];
  currentChapter: number = 1;

  constructor(
    private sharedService: AppSharedService,
  ) {
  }

  ngOnInit() {
    this.sharedService.getVoorbeelden()
      .pipe(
        mergeMap((voorbeelden: Voorbeeld[]): Observable<Voorbeeld> => from(voorbeelden)),
      filter((item: Voorbeeld) => item.hoofdstukNummer === this.currentChapter),
        toArray()
      ).subscribe((value: Voorbeeld[]) => this.voorbeelden = value)
  }


  onPaste() {
    return
  }

}
