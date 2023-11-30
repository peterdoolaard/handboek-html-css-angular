import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Chapter, CodeExample, Link } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AppSharedService {
  constructor(private http: HttpClient) {}

  // Houdt bij of de navigatie static of fixed is
  private classFixed$$ = new BehaviorSubject(false);
  classFixed$: Observable<boolean> = this.classFixed$$.asObservable();

  navIsFixed(value: boolean) {
    this.classFixed$$.next(value);
  }

  // Houdt bij wat het actieve hoofdstuk is in de pagina Voorbeelden
  private currentChapter$$ = new BehaviorSubject<Chapter | null>(null);
  currentChapter$ = this.currentChapter$$.asObservable();
  updateCurrentChapter(currentChapter: Chapter | undefined) {
    if (currentChapter) {
      this.currentChapter$$.next(currentChapter);
    }
  }

  // Houdt bij of er een notificatie (voor kopiëren) wordt getoond
  private notification$$ = new BehaviorSubject<boolean>(false);
  notification$ = this.notification$$.asObservable();
  notificationOn() {
    this.notification$$.next(true);
  }
  notificationOff() {
    this.notification$$.next(false);
  }

  // loadCodeExamples() {
  //   return this.http.get<CodeExample[]>('assets/data/voorbeelden.json').pipe(shareReplay());
  // }

  loadAllChapters() {
    return this.http.get<Chapter[]>('assets/data/hoofdstukken.json');
  }

  loadLinks() {
    return this.http.get<Link[]>('assets/data/links.json');
  }

  getExamples() {
    return this.http.get<CodeExample[]>('/assets/data/data.json');
  }

  getCode(path: string) {
    return this.http.get(path, { responseType: 'text' }).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
