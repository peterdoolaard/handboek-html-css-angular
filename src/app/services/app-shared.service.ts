import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Chapter, CodeExample, Link } from "../models";

@Injectable({
  providedIn: 'root'
})
export class AppSharedService {

    constructor(
    private http: HttpClient,
  ) {}

  private classFixed$$ = new BehaviorSubject(false);
  classFixed$: Observable<boolean> = this.classFixed$$.asObservable();

  navIsFixed(value: boolean) {
    this.classFixed$$.next(value);
  }

  private currentChapter$$ =
    new BehaviorSubject<Chapter>( {hoofdstukNummer: 1, hoofdstukTitel: 'Webtalen, browsers en editors'});
  currentChapter$ = this.currentChapter$$.asObservable();

  updateCurrentChapter(currentChapter: Chapter | undefined) {
    if (currentChapter) {
      this.currentChapter$$.next(currentChapter)
    }
  }

  loadCodeExamples() {
    return this.http.get<CodeExample[]>('assets/data/voorbeelden.json').pipe(
      shareReplay()
    )
  }

  loadAllChapters() {
    return this.http.get<Chapter[]>('assets/data/hoofdstukken.json').pipe(
      shareReplay()
    )
  }

  loadLinks() {
    return this.http.get<Link[]>('assets/data/links.json');
  }

}
