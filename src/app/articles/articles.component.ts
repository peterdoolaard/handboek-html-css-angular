import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../services/app-shared.service';
import { Observable, shareReplay, tap } from 'rxjs';
import { Article } from '../models';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articleList$!: Observable<Article[]>;

  constructor(
    private sharedService: AppSharedService
  ) {
  }

  ngOnInit() {
    this.articleList$ = this.sharedService.loadArticlesList().pipe(
      shareReplay(1),
      tap(result => result.sort((e1, e2) =>
        e2.date.localeCompare(e1.date)))
    );
  }
}
