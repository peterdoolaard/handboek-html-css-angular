import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExampleViewComponent } from './code-example-view.component';

describe('CodeExampleViewComponent', () => {
  let component: CodeExampleViewComponent;
  let fixture: ComponentFixture<CodeExampleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeExampleViewComponent]
    });
    fixture = TestBed.createComponent(CodeExampleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
