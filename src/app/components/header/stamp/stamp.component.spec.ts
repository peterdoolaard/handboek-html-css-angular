import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampComponent } from './stamp.component';

describe('StampComponent', () => {
  let component: StampComponent;
  let fixture: ComponentFixture<StampComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StampComponent]
    });
    fixture = TestBed.createComponent(StampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
