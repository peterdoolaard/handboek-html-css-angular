import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../../services/app-shared.service';
import { Link } from '../../models';
import { combineLatest, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit {
  links$!: Observable<Link[]>;
  currentChapter: number = 1;

  constructor(private sharedService: AppSharedService) {}

  ngOnInit() {
    this.links$ = combineLatest([this.sharedService.currentChapter$, this.sharedService.loadLinks()]).pipe(
      switchMap(([currentChapter, links]) => {
        const filteredLinks = links.filter((link) => link.hoofdstukNummer === currentChapter.hoofdstukNummer);
        return of(filteredLinks);
      }),
    );
  }

  //   this.codeExamples$ = combineLatest([this.sharedService.currentChapter$, this.sharedService.getExamples()]).pipe(
  //     switchMap(([currentChapter, examples]) => {
  //       const filteredExamples = examples.filter(
  //         (example) => example.hoofdstukNummer === currentChapter.hoofdstukNummer,
  //       );
  //       return of(filteredExamples);
  //     }),
  // }
}
