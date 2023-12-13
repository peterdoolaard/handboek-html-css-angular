import { Component, OnInit } from '@angular/core';

import { Article} from '../../models';
import { Observable, shareReplay } from 'rxjs';
import { AppSharedService } from '../../services/app-shared.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit{
  articleList$!: Observable<Article[]>;

  constructor(
    private sharedService: AppSharedService
  ) {
  }

  ngOnInit() {
    this.articleList$ = this.sharedService.loadArticlesList().pipe(shareReplay(1));
  }
}
