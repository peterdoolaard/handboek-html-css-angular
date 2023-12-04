import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chapter } from '../../models';
import { AppSharedService } from '../../services/app-shared.service';

@Component({
  selector: 'app-hoofdstuk',
  templateUrl: './hoofdstuk.component.html',
  styleUrls: ['./hoofdstuk.component.scss'],
})
export class HoofdstukComponent {
  hoofdstuk?: Chapter | null;

  @ViewChild('chapterWrapper') chapterWrapper!: ElementRef;

  constructor(private sharedService: AppSharedService) {
    this.sharedService.currentChapter$.subscribe((chapter) => {
      this.hoofdstuk = chapter;
      if (this.hoofdstuk?.hoofdstukNummer !== 1 && this.chapterWrapper) {
        const fontSize = window.getComputedStyle(this.chapterWrapper.nativeElement).fontSize;
        const y =
          this.chapterWrapper.nativeElement.getBoundingClientRect().top - parseInt(fontSize) * 9 + window.scrollY;
        window.scroll({
          top: y,
          behavior: 'smooth',
        });
      }
    });
  }
}
