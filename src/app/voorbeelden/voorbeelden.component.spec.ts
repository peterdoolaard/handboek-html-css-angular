import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoorbeeldenComponent } from './voorbeelden.component';

describe('VoorbeeldenComponent', () => {
  let component: VoorbeeldenComponent;
  let fixture: ComponentFixture<VoorbeeldenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoorbeeldenComponent]
    });
    fixture = TestBed.createComponent(VoorbeeldenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
