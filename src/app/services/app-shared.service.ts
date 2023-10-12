import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Hoofdstuk, Voorbeeld, Link } from "../models";

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
    new BehaviorSubject<Hoofdstuk | undefined>( {hoofdstukNummer: 1, hoofdstukTitel: 'Webtalen, browsers en editors'});
  currentChapter$ = this.currentChapter$$.asObservable();

  private hoofdstukken$$ = new BehaviorSubject<Hoofdstuk[] | null>(null);
  hoofdstukken$: Observable<Hoofdstuk[] | null> = this.hoofdstukken$$.asObservable();



  navIsFixed(value: boolean) {
    this.classFixed$$.next(value);
  }

  setCurrentChapter(value: Hoofdstuk | undefined) {
    if (value) {
      this.currentChapter$$.next(value)
    }
  }

  getVoorbeelden() {
    return this.http.get<Voorbeeld[]>('assets/data/voorbeelden.json')
  }

  getHoofdstukken() {
    return this.http.get<Hoofdstuk[]>('assets/data/hoofdstukken.json')
  }


  getLinks() {
    return this.http.get<Link[]>('/assets/data/links.json');
  }


}
