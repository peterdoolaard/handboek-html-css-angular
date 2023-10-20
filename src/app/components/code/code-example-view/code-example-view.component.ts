import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, Observable } from "rxjs";
import { HighlightService } from "../../../services/highlight.service";

@Component({
  selector: 'code-example-view',
  templateUrl: './code-example-view.component.html',
  styleUrls: ['./code-example-view.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CodeExampleViewComponent implements OnInit, AfterViewInit {
  @Input() exampleHtml!: HTMLElement;
  @Input() exampleCss!: HTMLElement;
  @Input() codeWrapper!: HTMLElement;
  @Input() btnReset!: HTMLElement;
  @Input() toggleEdit!: HTMLInputElement;

  shadowRootElement!: HTMLElement;
  shadowCodeStyle!: HTMLElement;
  shadowCodeHtml!: HTMLElement;

  observeCodeExample$!: MutationObserver;
  observerToggleEdit$!: Observable<Event>;

  config = {
    attributes: false,
    subtree: true,
    childList: false,
    characterData: true,
    characterDataOldValue: false
  };

  constructor(
    private elementRef: ElementRef,
    private highlightService: HighlightService
  ) {}

  ngOnInit() {
    this.observeCodeExample$ = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.target.parentElement) {
          if (mutation.target.parentElement.classList.contains('language-html')) {
            this.shadowCodeHtml.innerHTML = this.exampleHtml.innerText;
          }
          if (mutation.target.parentElement.classList.contains('language-css')) {
            this.shadowCodeStyle.innerHTML = this.exampleCss.innerText;
          }
        }
      })
    });

    this.observerToggleEdit$ = fromEvent(this.toggleEdit, 'change')

  }

  ngAfterViewInit() {
    this.init();
    this.observeCodeExample$.observe(this.codeWrapper, this.config)
    this.observerToggleEdit$.subscribe(event => {
      console.log(event)
      if (this.toggleEdit.checked) {
        this.codeWrapper.setAttribute('contentediable', 'true')
        this.exampleHtml.textContent = this.exampleHtml.textContent;
        this.exampleCss.textContent = this.exampleCss.textContent;
      } else {
        this.codeWrapper.setAttribute('contentediable', 'false');
        this.highlightService.highlightAllUnder(this.codeWrapper)


      }
    })

  }

  init() {
    this.shadowRootElement = this.elementRef.nativeElement.shadowRoot;
    this.shadowCodeStyle = this.shadowRootElement.appendChild(document.createElement('style'));
    this.shadowCodeHtml = this.elementRef.nativeElement.shadowRoot.querySelector('div');
    this.shadowCodeStyle.innerHTML = this.exampleCss.innerText;
    this.shadowCodeHtml.innerHTML = this.exampleHtml.innerText;
  }


}
