import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { HighlightService } from '../../../services/highlight.service';
import { CodeExample } from '../../../models';
import { AppSharedService } from '../../../services/app-shared.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'code-example-view',
  templateUrl: './code-example-view.component.html',
  styleUrls: ['./code-example-view.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CodeExampleViewComponent implements OnInit, AfterViewInit {
  @Input() example!: CodeExample;
  @Input() exampleHtml!: HTMLElement;
  @Input() exampleCss!: HTMLElement;
  @Input() codeWrapper!: HTMLElement;
  @Input() btnReset!: HTMLElement;
  @Input() toggleEdit!: HTMLInputElement;
  @Input() copyHtml!: HTMLButtonElement;
  @Input() copyCss!: HTMLButtonElement;

  shadowRootElement!: HTMLElement;
  shadowCodeHtml!: HTMLElement;
  shadowCodeStyle!: HTMLElement;

  observeCodeExample$!: MutationObserver;
  observerToggleEdit$!: Observable<Event>;
  observeBtnReset$!: Observable<Event>;

  dangerousHtml: SafeHtml = '';

  config = {
    attributes: false,
    characterDataOldValue: false,
    characterData: true,
    childList: true,
    subtree: true,
  };

  constructor(
    private elementRef: ElementRef,
    private highlightService: HighlightService,
    private sharedService: AppSharedService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    this.observerToggleEdit$ = fromEvent(this.toggleEdit, 'change');
    this.observeBtnReset$ = fromEvent(this.btnReset, 'click');

    this.observeCodeExample$ = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.target.parentElement) {
          if (record.target.parentElement?.classList.contains('example-html')) {
            this.shadowCodeHtml.innerHTML = this.exampleHtml.innerText;
            this.btnReset.removeAttribute('hidden');
          }
          if (record.target.parentElement?.classList.contains('example-css')) {
            this.shadowCodeStyle.innerHTML = this.exampleCss.innerText;
            this.btnReset.removeAttribute('hidden');
          }
        }
      });
    });

    // 1. Bewerken in/uitschakelen
    // 2. Subscriben op de codeblokken-observers
    // 3. De return/entertoets geeft alleen een regeleinde
    // 4. De HTML- en CSS-codeblokken worden bewerkbaar
    // De time-out zorgt ervoor dat het verwijderen van de spans
    // van codekleuring niet wordt gedetecteerd.
    // Daardoor wordt de herstelknop pas actief in als de gebruiker de code aanpast.
    this.observerToggleEdit$.subscribe(() => {
      if (this.toggleEdit.checked) {
        setTimeout(() => {
          this.observeCodeExample$.observe(this.exampleHtml, this.config);
          this.observeCodeExample$.observe(this.exampleCss, this.config);
        }, 100);
        this.codeWrapper.addEventListener('keydown', this.reAssignEnterKey);
        this.exampleHtml.setAttribute('contenteditable', 'true');
        this.exampleCss.setAttribute('contenteditable', 'true');
        // Volgende 2 regels verwijderen alle spans van de codekleuring met Prismjs
        this.exampleHtml.textContent = this.exampleHtml.textContent;
        this.exampleCss.textContent = this.exampleCss.textContent;
      } else {
        this.observeCodeExample$.disconnect();
        this.observeCodeExample$.disconnect();
        this.codeWrapper.removeEventListener('keydown', this.reAssignEnterKey);
        this.exampleHtml.removeAttribute('contenteditable');
        this.exampleCss.removeAttribute('contenteditable');
        // herstel codekleuring
        this.highlightService.highlightAllUnder(this.codeWrapper);
      }
    });

    this.observeBtnReset$.subscribe(() => {
      this.reset();
    });

    this.codeWrapper.addEventListener('paste', this.sanitizePaste);
  }

  init() {
    this.shadowRootElement = this.elementRef.nativeElement.shadowRoot;
    this.shadowCodeHtml = this.elementRef.nativeElement.shadowRoot.querySelector('div');
    this.shadowCodeStyle = this.shadowRootElement.appendChild(document.createElement('style'));

    this.sharedService.getCode(this.example.codeHtml).subscribe((html) => {
      // Workaround for Angular not displaying SVG's in innerHTML in the component.
      // If the code includes the string 'svg' then dangerousHtml gets rendered through [innerHtml] in the template
      if (this.exampleHtml.innerHTML.includes('svg', 1)) {
        this.dangerousHtml = this.sanitizer.bypassSecurityTrustHtml(this.exampleHtml.innerHTML);
      }
      this.exampleHtml.innerHTML = this.escape(html);
      this.shadowCodeHtml.innerHTML = this.exampleHtml.innerText;
      this.highlightService.highlightAllUnder(this.codeWrapper);
    });
    this.sharedService.getCode(this.example.codeCss).subscribe((css) => {
      if (css.length < 1) {
        this.exampleCss.innerHTML =
          '/* Geen CSS beschikbaar */\n/* In de bewerkmodus kunt u hier eigen CSS-regels typen */';
      } else {
        this.exampleCss.innerHTML = css;
      }
      this.shadowCodeStyle.innerHTML = this.exampleCss.innerText;
      this.highlightService.highlightAllUnder(this.codeWrapper);
    });
  }

  reset() {
    this.sharedService.getCode(this.example.codeHtml).subscribe((html) => {
      this.exampleHtml.innerHTML = this.escape(html);
      this.shadowCodeHtml.innerHTML = this.exampleHtml.innerText;
      this.highlightService.highlightAllUnder(this.codeWrapper);
    });
    this.sharedService.getCode(this.example.codeCss).subscribe((css) => {
      if (css.length < 1) {
        this.exampleCss.innerHTML =
          '/* Geen CSS beschikbaar */\n/* In de bewerkmodus kunt u hier eigen CSS-regels typen */';
      } else {
        this.exampleCss.innerHTML = css;
      }
      this.shadowCodeStyle.innerHTML = this.exampleCss.innerText;
      this.highlightService.highlightAllUnder(this.codeWrapper);
      this.toggleEdit.checked = false;
    });
    setTimeout(() => {
      this.btnReset.setAttribute('hidden', '');
    }, 100);
  }

  escape(value: string) {
    return value.replaceAll(/\t/g, ' ').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  reAssignEnterKey(event: KeyboardEvent) {
    if (event.code === 'enter' && !event.shiftKey) {
      event.preventDefault();
      document.execCommand('insertLineBreak');
    }
  }

  // copyCode(event: Event)  {
  // };

  sanitizePaste(event: ClipboardEvent) {
    event.preventDefault();
    if (event.clipboardData) {
      let data = event.clipboardData.getData('text/plain');
      console.log('data ' + data);
      event.clipboardData.setData('text/plain', data);
      let selection = window.getSelection();
      console.log('selection' + selection);

      if (selection) {
        if (!selection.rangeCount) return;
        console.log(selection.rangeCount);
        selection.getRangeAt(0).insertNode(document.createTextNode(data));
        selection.collapseToEnd();
      }
    }
  }
}
