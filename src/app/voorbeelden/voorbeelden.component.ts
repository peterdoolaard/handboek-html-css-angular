import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Chapter } from '../models';
import { AppSharedService } from '../services/app-shared.service';
import { map, Observable, shareReplay } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-voorbeelden',
  templateUrl: './voorbeelden.component.html',
  styleUrls: ['./voorbeelden.component.scss'],
})
export class VoorbeeldenComponent implements OnInit {
  chapters$!: Observable<Chapter[]>;
  currentChapter!: Chapter | undefined;

  formGroup = new FormGroup({
    selectedHoofdstuk: new FormControl(1, { nonNullable: true }),
  });

  constructor(
    private sharedService: AppSharedService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.chapters$ = this.sharedService.loadAllChapters().pipe(shareReplay(1));

    this.route.queryParams.subscribe((json) => {
      const hoofdstuk = json['hoofdstuk'] as string | undefined;
      if (hoofdstuk) {
        this.chapters$
          .pipe(
            map((chapters) =>
              chapters ? chapters.find((chapter) => chapter.hoofdstukNummer === +hoofdstuk) : undefined,
            ),
          )
          .subscribe((chapter) => {
            this.currentChapter = chapter;
            this.sharedService.updateCurrentChapter(this.currentChapter);
            this.formGroup.controls.selectedHoofdstuk.setValue(+hoofdstuk, { emitEvent: false });
          });
      } else {
        this.router.navigate(['voorbeelden'], {
          queryParams: { hoofdstuk: 1 },
        });
      }
    });
  }

  findChapter() {
    this.router.navigate(['voorbeelden'], {
      queryParams: { hoofdstuk: this.formGroup.controls.selectedHoofdstuk.value },
    });
  }
}
