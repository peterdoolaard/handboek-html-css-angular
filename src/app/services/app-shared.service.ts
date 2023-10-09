import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Hoofdstuk, Voorbeeld, Link } from "../models";

@Injectable({
  providedIn: 'root'
})
export class AppSharedService {


  constructor(
    private http: HttpClient,
  ) {
  }

  private setClassFixed$$ = new BehaviorSubject(false);
  setClassFixed$: Observable<boolean> = this.setClassFixed$$.asObservable();

  navIsFixed(value: boolean) {
    this.setClassFixed$$.next(value);
  }

  getVoorbeelden() {
    return this.http.get<Voorbeeld[]>('assets/data/voorbeelden.json');
  }

  getHoofdstukken() {
    return this.http.get<Hoofdstuk[]>('assets/data/hoofdstukken.json');
  }

  getLinks() {
    return this.http.get<Link[]>('/assets/data/links.json');
  }
}
