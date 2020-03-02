import { TestBed } from '@angular/core/testing';

import { ReportsApiService } from './reports-api.service';

describe('ReportsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportsApiService = TestBed.get(ReportsApiService);
    expect(service).toBeTruthy();
  });
});
