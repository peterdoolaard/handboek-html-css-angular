import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

import { Chapter } from "../models";
import { AppSharedService } from "../services/app-shared.service";
import { map, Observable } from "rxjs";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-voorbeelden',
  templateUrl: './voorbeelden.component.html',
  styleUrls: ['./voorbeelden.component.scss']
})
export class VoorbeeldenComponent implements OnInit {
  chapters$!: Observable<Chapter[]>;
  currentChapter!: Chapter | undefined;
  hoofdstukNummer: number = 1;

  formGroup = new FormGroup({
    selectedHoofdstuk: new FormControl(1, {nonNullable: true})
  })

  constructor(
    private sharedService: AppSharedService,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
    this.chapters$ = this.sharedService.loadAllChapters();
    this.findChapter();
    this.location.subscribe(location => {
      if (location.url?.includes('hoofdstuk')) {
        let string = location.url;
        let lastSlash = string?.lastIndexOf('/')
        this.hoofdstukNummer = +location.url?.substring(lastSlash+1)
        this.chapters$.pipe(
          map(chapters => chapters ? chapters.find(chapter => chapter.hoofdstukNummer === this.hoofdstukNummer): undefined)
        ).subscribe(chapter => {
          this.currentChapter = chapter;
          this.sharedService.updateCurrentChapter(this.currentChapter);
          this.formGroup.controls.selectedHoofdstuk.setValue(this.hoofdstukNummer);
        })
      }
    })
  }

  findChapter() {
    this.chapters$?.pipe(
      map(chapters => chapters ? chapters.find(chapter => chapter.hoofdstukNummer === this.formGroup.controls.selectedHoofdstuk.value): undefined)
    ).subscribe(chapter => {
      this.currentChapter = chapter;
      this.sharedService.updateCurrentChapter(this.currentChapter);
      this.router.navigate(['voorbeelden/hoofdstuk', this.currentChapter?.hoofdstukNummer])
    })
  }
}
