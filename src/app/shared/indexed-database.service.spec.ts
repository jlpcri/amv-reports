import { TestBed } from '@angular/core/testing';

import { IndexedDatabaseService } from './indexed-database.service';

describe('IndexedDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndexedDatabaseService = TestBed.get(IndexedDatabaseService);
    expect(service).toBeTruthy();
  });
});
