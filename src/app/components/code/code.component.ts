import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { combineLatest, Observable, of, switchMap, tap } from 'rxjs';

import { AppSharedService } from '../../services/app-shared.service';
import { HighlightService } from '../../services/highlight.service';
import { CodeExample } from '../../models';

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
  @ViewChild('figureContainerInner') figureContainerInner!: ElementRef;
  @ViewChild('toggleCollapsedExpanded') toggleCollapsedExpanded!: ElementRef;

  codeExamples$: Observable<CodeExample[]> | undefined;
  notificationIsShown: boolean = false;

  constructor(
    private sharedService: AppSharedService,
    private highlightService: HighlightService,
    private renderer: Renderer2,
  ) {}

  // Bewerkingen op de codevoorbeelden zijn pas
  // mogelijk nadat de observable waarde heeft gestuurd
  // Plaats bewerkingen in de tap() timeout() callback
  ngOnInit() {
    // Deze observable voorkomt dubbele kopieeracties
    this.sharedService.notification$.subscribe((isShown) => (this.notificationIsShown = isShown));

    this.codeExamples$ = combineLatest([this.sharedService.currentChapter$, this.sharedService.getExamples()]).pipe(
      switchMap(([currentChapter, examples]) => {
        const filteredExamples = examples.filter(
          (example) => example.hoofdstukNummer === currentChapter?.hoofdstukNummer,
        );
        return of(filteredExamples);
      }),
      tap(() => {
        setTimeout(() => {
          this.highlightService.highlightAll();
          if (this.figureContainerInner) {
            this.renderer.addClass(this.figureContainerInner.nativeElement, '__expanded');
          }
        }, 0);
      }),
    );
  }

  // Maak de custom alert voor kopiëren naar klembord
  createAlertElm(textNode: string, className: string[]): HTMLDivElement {
    this.sharedService.notificationOn();
    const alertElm: HTMLDivElement = document.createElement('div');
    const alertElmContent: Text = document.createTextNode(textNode);
    alertElm.classList.add(...className);
    alertElm.setAttribute('tabIndex', '-1');
    alertElm.appendChild(alertElmContent);
    return alertElm;
  }

  // Verwijder een element na een gegeven wachttijd
  removeElm(parent: HTMLElement, child: HTMLElement, delay: number) {
    setTimeout(() => {
      this.sharedService.notificationOff();
      parent.removeChild(child);
    }, delay);
  }

  copyCode(event: any) {
    if (!this.notificationIsShown) {
      let selection = event.target.previousSibling.textContent;
      navigator.clipboard.writeText(selection).then(
        () => {
          let parent = event.target.parentElement;
          parent.appendChild(this.createAlertElm('Code gekopieerd\nnaar klembord', ['alert', '__success']));
          let alertElm = parent.querySelector('div.alert');
          if (alertElm) {
            alertElm.focus();
          }
          this.removeElm(parent, alertElm, 1000);
        },
        (error) => {
          let parent = event.target.parentElement;
          parent.appendChild(this.createAlertElm(`Kopiëren is niet gelukt.\n ${error}`, ['alert', '__failed']));
          let alertElm = parent.querySelector('div.alert');
          if (alertElm) {
            alertElm.focus();
          }
          this.removeElm(parent, alertElm, 1000);
        },
      );
    }
  }

  addEffect(event: any) {
    if (!this.notificationIsShown) {
      event.target.classList.add('btn-copy-code-click');
    }
  }

  removeEffect(event: any) {
    event.target.classList.remove('btn-copy-code-click');
  }

  downEffect(event: any) {
    event.target.classList.add('__pressed');
  }

  upEffect(event: any) {
    event.target.classList.remove('__pressed');
  }

  toggleExample(elm: HTMLElement) {
    elm.classList.toggle('__expanded');
  }
}
