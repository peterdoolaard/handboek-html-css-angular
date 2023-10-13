import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

import { Chapter } from "../models";
import { AppSharedService } from "../services/app-shared.service";
import { map, Observable } from "rxjs";

@Component({
  selector: 'app-voorbeelden',
  templateUrl: './voorbeelden.component.html',
  styleUrls: ['./voorbeelden.component.scss']
})
export class VoorbeeldenComponent implements OnInit, OnDestroy {
  chapters$: Observable<Chapter[] | undefined> | undefined;
  currentChapter$: Observable<Chapter | undefined> | undefined;

  formGroup = new FormGroup({
    selectedHoofdstuk: new FormControl(1, {nonNullable: true})
  })

  constructor(
    private sharedService: AppSharedService,
  ) {}

  ngOnInit() {
      this.chapters$ = this.sharedService.loadAllChapters();
      this.findChapter();
  }

  findChapter() {
    return this.currentChapter$ = this.chapters$?.pipe(
      map(chapters => {
        return chapters ? chapters.find(chapter => chapter.hoofdstukNummer === this.formGroup.controls.selectedHoofdstuk.value) : undefined;
      })
    )
  }


  ngOnDestroy() {
  }
}
