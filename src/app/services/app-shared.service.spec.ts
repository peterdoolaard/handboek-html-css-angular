import { TestBed } from '@angular/core/testing';

import { AppSharedService } from './app-shared.service';

describe('AppSharedService', () => {
  let service: AppSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
