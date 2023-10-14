import { Inject, Injectable } from '@angular/core';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';

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
      console.log('service')
      Prism.highlightAll()
    }
  }
}
