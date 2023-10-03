import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoorbeeldComponent } from './voorbeeld.component';

describe('VoorbeeldComponent', () => {
  let component: VoorbeeldComponent;
  let fixture: ComponentFixture<VoorbeeldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoorbeeldComponent]
    });
    fixture = TestBed.createComponent(VoorbeeldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
