import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppSharedService } from '../../services/app-shared.service';
import { SafeHtml } from '@angular/platform-browser';
import { HighlightService } from '../../services/highlight.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {
  articleHtml: SafeHtml = '';

  constructor(
    private sharedService: AppSharedService,
    private highlightService: HighlightService
  ) {
  }

  ngOnInit() {
    this.sharedService.getArticle('assets/artikelen/minder-code-en-meer-overzicht-dankzij-css-nesting.html')
      .subscribe((html) => {
        this.articleHtml = html;
        setTimeout(() => {
          this.highlightService.highlightAll();
        }, 50);

      });
  }
}
