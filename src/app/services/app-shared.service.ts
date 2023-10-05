import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppSharedService {

  private setClassFixed$$ = new BehaviorSubject(false);
  setClassFixed$: Observable<boolean> = this.setClassFixed$$.asObservable();

  navIsFixed(value: boolean) {
    this.setClassFixed$$.next(value);
  }
}
