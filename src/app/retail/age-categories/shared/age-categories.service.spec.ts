import { TestBed } from '@angular/core/testing';

import { AgeCategoriesService } from './age-categories.service';

describe('AgeCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgeCategoriesService = TestBed.get(AgeCategoriesService);
    expect(service).toBeTruthy();
  });
});
