import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, Observable } from "rxjs";
import { HighlightService } from "../../../services/highlight.service";
import { CodeExample } from "../../../models";


@Component({
  selector: 'code-example-view',
  templateUrl: './code-example-view.component.html',
  styleUrls: ['./code-example-view.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CodeExampleViewComponent implements OnInit, AfterViewInit {
  @Input() example!: CodeExample;
  @Input() exampleHtml!: HTMLElement;
  @Input() exampleCss!: HTMLElement;
  @Input() codeWrapper!: HTMLElement;
  @Input() btnReset!: HTMLElement;
  @Input() toggleEdit!: HTMLInputElement;

  shadowRootElement!: HTMLElement;
  shadowCodeHtml!: HTMLElement;
  shadowCodeStyle!: HTMLElement;

  observeCodeExample$!: MutationObserver;
  observerToggleEdit$!: Observable<Event>;
  observeBtnReset$!: Observable<Event>;

  config = {
    attributes: false,
    subtree: true,
    childList: true,
    characterData: true,
    characterDataOldValue: true
  };

  constructor(
    private elementRef: ElementRef,
    private highlightService: HighlightService
  ) {
  }

  ngOnInit() {
    this.init();
    this.observeCodeExample$ = new MutationObserver(records => {
      records.forEach(record => {
        if (record.target.parentElement) {
          if (record.target.parentElement.classList.contains('language-html')) {
            this.shadowCodeHtml.innerHTML = this.exampleHtml.innerText;
          }
          if (record.target.parentElement.classList.contains('language-css')) {
            console.log('css mutatie')
            this.shadowCodeStyle.innerText = this.exampleCss.innerText;
          }
        }
        this.btnReset.classList.add('___active');
      })
    });
  }

  ngAfterViewInit() {
    this.observeCodeExample$.observe(this.codeWrapper, this.config);
    this.observerToggleEdit$ = fromEvent(this.toggleEdit, 'change');
    this.observeBtnReset$ = fromEvent(this.btnReset, 'click');

    this.observerToggleEdit$.subscribe(event => {
      if (this.toggleEdit.checked) {
        this.codeWrapper.addEventListener('keydown', this.reAssignEnterKey);
        this.exampleHtml.setAttribute('contenteditable', 'true');
        this.exampleCss.setAttribute('contenteditable', 'true');
        // volgende 2 regels verwijderen alle spans van de codekleuring met Prismjs
        this.exampleHtml.textContent = this.exampleHtml.textContent;
        this.exampleCss.textContent = this.exampleCss.textContent;
      } else {
        this.codeWrapper.removeEventListener('keydown', this.reAssignEnterKey);
        this.exampleHtml.removeAttribute('contenteditable');
        this.exampleCss.removeAttribute('contenteditable');
        this.highlightService.highlightAllUnder(this.codeWrapper);
      }
    });

    this.observeBtnReset$.subscribe((event) => {
      this.reset();
    });

    this.codeWrapper.addEventListener('paste', this.sanitizePaste);
    //
    // this.codeWrapper.addEventListener('copy', this.copyCode);

  }

  init() {
    this.shadowRootElement = this.elementRef.nativeElement.shadowRoot;
    this.shadowCodeHtml = this.elementRef.nativeElement.shadowRoot.querySelector('div');
    this.shadowCodeStyle = this.shadowRootElement.appendChild(document.createElement('style'));

    this.exampleHtml.innerHTML = this.escape(this.example.codeHtml);
    if (this.example.codeCss === '') {
      this.exampleCss.innerHTML = '/* Geen CSS beschikbaar */\n/* Typ hier je eigen CSS */';
    } else {
      this.exampleCss.innerHTML = this.escape(this.example.codeCss);
    }
    this.shadowCodeStyle.innerHTML = this.exampleCss.innerText;
    this.shadowCodeHtml.innerHTML = this.exampleHtml.innerText;
  }

  reset() {
    this.btnReset.classList.remove('___active');
    this.exampleHtml.innerHTML = this.escape(this.example.codeHtml);

    this.exampleCss.innerHTML = this.escape(this.example.codeCss);
    this.shadowCodeHtml.innerHTML = this.exampleHtml.innerText;
    if (this.example.codeCss === '') {
      this.exampleCss.innerHTML = '/* Geen CSS beschikbaar */\n/* Typ hier je eigen CSS */';
    } else {
      this.shadowCodeStyle.innerHTML = this.exampleCss.innerText;
    }
    if (!this.toggleEdit.checked) {
      this.highlightService.highlightAllUnder(this.codeWrapper);
    }
  }

  escape(value: string) {
    return value.replaceAll(/\t/g, ' ').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  reAssignEnterKey(event: KeyboardEvent) {
    if (event.code === 'enter' && !event.shiftKey) {
      event.preventDefault();
      document.execCommand('insertLineBreak');
    }
  };

  copyCode(event: ClipboardEvent) {
    const selection = document.getSelection();
    if (event.clipboardData && selection) {
      event.clipboardData.setData('text/plain', selection.toString())
      event.preventDefault();
    }
  };

  sanitizePaste(event: ClipboardEvent) {
    event.preventDefault();
    if (event.clipboardData) {
      let data = event.clipboardData.getData('text/plain');
      event.clipboardData.setData('text/plain', data);
      let selection = window.getSelection();
      if (selection) {
        if (!selection.rangeCount) return;
        selection.getRangeAt(0).insertNode(document.createTextNode(data));
        selection.collapseToEnd();
      }
    }
  }
}
