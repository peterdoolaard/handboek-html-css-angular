import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
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

  private currentChapter$$ =
    new BehaviorSubject<Chapter | undefined>( {hoofdstukNummer: 1, hoofdstukTitel: 'Webtalen, browsers en editors'});
  currentChapter$ = this.currentChapter$$.asObservable();

  private hoofdstukken$$ = new BehaviorSubject<Chapter[] | null>(null);
  hoofdstukken$: Observable<Chapter[] | null> = this.hoofdstukken$$.asObservable();



  navIsFixed(value: boolean) {
    this.classFixed$$.next(value);
  }

  setCurrentChapter(value: Chapter | undefined) {
    if (value) {
      this.currentChapter$$.next(value)
    }
  }

  getVoorbeelden() {
    return this.http.get<CodeExample[]>('assets/data/voorbeelden.json')
  }

  loadAllChapters() {
    return this.http.get<Chapter[]>('assets/data/hoofdstukken.json')
  }


  getLinks() {
    return this.http.get<Link[]>('/assets/data/links.json');
  }


}
