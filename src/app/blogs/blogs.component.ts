import { AfterViewInit, Component } from '@angular/core';
import { HighlightService } from '../services/highlight.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements AfterViewInit {
  constructor(private highlightService: HighlightService) {}

  ngAfterViewInit() {
    this.highlightService.highlightAll();
  }
}
