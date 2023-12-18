import { Inject, Injectable } from '@angular/core';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

declare const Prism: any;

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
      Prism.plugins.NormalizeWhitespace.setDefaults({
        'remove-trailing': true,
        'remove-indent': true,
        'left-trim': true,
        'right-trim': true,
        'indent': 0,
        'remove-initial-line-feed': true,
        'tabs-to-spaces': 2,
      });

    }
  }

  highlightAllUnder(element: HTMLElement) {
    Prism.highlightAllUnder(element);
    Prism.plugins.NormalizeWhitespace.setDefaults({
      'remove-trailing': true,
      'remove-indent': true,
      'left-trim': true,
      'right-trim': true,
      'indent': 0,
      'remove-initial-line-feed': true,
      'tabs-to-spaces': 2,
    });
  }
}
