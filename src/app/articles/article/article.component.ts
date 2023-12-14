import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppSharedService } from '../../services/app-shared.service';
import { SafeHtml } from '@angular/platform-browser';
import { HighlightService } from '../../services/highlight.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {
  articleUrl: string | null = '';
  articleHtml: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private sharedService: AppSharedService,
    private highlightService: HighlightService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('articleUrl'))
      )
    ).subscribe((path) => this.articleUrl = path);

    this.sharedService.getArticle(`assets/artikelen/${this.articleUrl}.html`)
      .subscribe((html) => {
        this.articleHtml = html;
        setTimeout(() => {
          this.highlightService.highlightAll();
        }, 1);
      });
  }
}
