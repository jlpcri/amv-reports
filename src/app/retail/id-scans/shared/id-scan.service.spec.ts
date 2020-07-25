import { TestBed } from '@angular/core/testing';

import { IdScanService } from './id-scan.service';

describe('IdScanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdScanService = TestBed.get(IdScanService);
    expect(service).toBeTruthy();
  });
});
