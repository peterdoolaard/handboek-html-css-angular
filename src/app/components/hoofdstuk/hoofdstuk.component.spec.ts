import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoofdstukComponent } from './hoofdstuk.component';

describe('ChapterComponent', () => {
  let component: HoofdstukComponent;
  let fixture: ComponentFixture<HoofdstukComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoofdstukComponent]
    });
    fixture = TestBed.createComponent(HoofdstukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
