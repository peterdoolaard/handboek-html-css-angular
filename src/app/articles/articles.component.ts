import { AfterViewInit, Component } from '@angular/core';
import { HighlightService } from '../services/highlight.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements AfterViewInit {
  constructor(private highlightService: HighlightService) {}

  ngAfterViewInit() {
    this.highlightService.highlightAll();
  }
}
