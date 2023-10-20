import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  @ViewChild('codeWrapper') divCodeWrapper!: ElementRef;
  @ViewChild('btnReset') btnReset!: ElementRef;
  @ViewChild('exampleView') divExampleView!: ElementRef;
  @ViewChild('exampleHtml') exampleHtml!: ElementRef;
  @ViewChild('exampleCss') exampleCss!: ElementRef;
  @ViewChild('exampleStyle') exampleStyle!: ElementRef;
  @ViewChild('toggleEdit') toggleEdit!: ElementRef;

  codeExamples$: Observable<CodeExample[]> | undefined;
  checked: boolean = false;

  // observeCodeWrapper = new MutationObserver(mutations => this.updateView(mutations));
  config = {
    attributes: false,
    subtree: true,
    childList: false,
    characterData: true,
    characterDataOldValue: false
  };

  constructor(
    private sharedService: AppSharedService,
    private highlightService: HighlightService,
  ) {
  }

  // Bewerkingen op de codevoorbeelden zijn pas
  // mogelijk nadat de observable waarde heeft gestuurd
  // Plaats bewerkingen in de tap() timeout() callback
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
        return of(filteredExamples);
      }),
      tap(codeExample => {
        console.log(codeExample);
        setTimeout(() => {
          this.highlightService.highlightAll();
          // this.observeCodeWrapper.observe(this.divCodeWrapper.nativeElement, this.config);
        }, 0)
      })
    );
  }


  onPaste() {
    return
  }

  // protected readonly ElementRef = ElementRef;
}
