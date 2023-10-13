import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of, switchMap  } from "rxjs";

import { AppSharedService } from "../../services/app-shared.service";
import { CodeExample } from "../../models";


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {
  codeExamples$: Observable<CodeExample[]> | undefined;

  constructor(
    private sharedService: AppSharedService,
  ) {}

  ngOnInit() {
    this.sharedService.currentChapter$.subscribe(val => console.log(val.hoofdstukNummer))

    this.codeExamples$ = combineLatest([
      this.sharedService.currentChapter$,
      this.sharedService.loadCodeExamples()
    ]).pipe(
      switchMap(([currentChapter, examples]) => {
        const filteredExamples = examples.filter(
          (example) => example.hoofdstukNummer === currentChapter.hoofdstukNummer
        );
        console.log(filteredExamples)
        return of(filteredExamples);
      })
    );
  }




  onPaste() {
    return
  }

}
