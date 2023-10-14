import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of, switchMap, tap } from "rxjs";

import { AppSharedService } from "../../services/app-shared.service";
import { HighlightService } from "../../services/highlight.service";
import { CodeExample } from "../../models";


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit {
  codeExamples$: Observable<CodeExample[]> | undefined;

  constructor(
    private sharedService: AppSharedService,
    private highlightService: HighlightService,
  ) {}

  ngOnInit() {
    this.codeExamples$ = combineLatest([
      this.sharedService.currentChapter$,
      this.sharedService.loadCodeExamples()
    ]).pipe(
      switchMap(([currentChapter, examples]) => {
        const filteredExamples = examples.filter(
          (example) => example.hoofdstukNummer === currentChapter.hoofdstukNummer
        );
        return of(filteredExamples);
      }),
      tap(x => {
        x;
        setTimeout(() => {
          this.highlightService.highlightAll();
        }, 0)
      })
    );
  }





  onPaste() {
    return
  }

}
