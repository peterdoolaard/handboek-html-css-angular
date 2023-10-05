import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpageComponent } from './testpage.component';

describe('TestpageComponent', () => {
  let component: TestpageComponent;
  let fixture: ComponentFixture<TestpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestpageComponent]
    });
    fixture = TestBed.createComponent(TestpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
