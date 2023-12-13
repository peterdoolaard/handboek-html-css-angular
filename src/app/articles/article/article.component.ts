import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../../services/app-shared.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articleHtml: SafeHtml = '';

  constructor(
    private sharedService: AppSharedService,
  ) {
  }

  ngOnInit() {
    this.sharedService.getArticle('assets/artikelen/minder-code-en-meer-overzicht-dankzij-css-nesting.html')
      .subscribe((html) => {
        this.articleHtml = html;
      });
  }
}
