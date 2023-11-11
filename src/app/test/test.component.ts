import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CodeExample } from '../models';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  myHtml$!: Observable<string>;
  examples$!: Observable<CodeExample[]>;
  filteredExamples$!: Observable<CodeExample[]>;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.myHtml$ = this.getCode('/assets/data/1.1.html');
    this.examples$ = this.getExamples('/assets/data/data.json');
    this.filteredExamples$ = this.getExamplesFromChapter(2);
  }

  getExamples(file: string) {
    return this.http.get<CodeExample[]>(file);
  }

  getExamplesFromChapter(chapterNumber: number): Observable<CodeExample[]> {
    return this.examples$.pipe(
      map((examples) => examples.filter((example: CodeExample) => example.hoofdstukNummer === chapterNumber)),
    );
  }

  getCode(path: string) {
    return this.http.get(path, { responseType: 'text' });
  }
}
