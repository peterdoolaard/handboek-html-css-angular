import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  codeExamples$: Observable<CodeExample[]> | undefined;
  observeCodeWrapper = new MutationObserver(mutations => this.updateView(mutations))
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

  // Bewerkingen op de codevoorbeelden
  // zijn pas mogelijk nadat de observable klaar is
  // Plaats bewerkingen in de tap() timeout() callback
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
          this.observeCodeWrapper.observe(this.divCodeWrapper.nativeElement, this.config);
        }, 0)
      })
    );
  }

  updateView(mutations: MutationRecord[]) {
    mutations.forEach((mutation) => {
      this.btnReset.nativeElement.style.opacity = '1';
      if (mutation.target.parentElement?.classList.contains('example-html')) {
        this.divExampleView.nativeElement.innerHTML = this.exampleHtml.nativeElement.textContent;
      }
      if (mutation.target.parentElement?.classList.contains('example-css')) {
        this.exampleStyle.nativeElement.innerHTML = this.exampleCss.nativeElement.textContent;
      }
    })
  }

  onPaste() {
    return
  }

}
