import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../services/app-shared.service';
import { Observable, shareReplay } from 'rxjs';
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
    this.articleList$ = this.sharedService.loadArticlesList().pipe(shareReplay(1));
  }

}
