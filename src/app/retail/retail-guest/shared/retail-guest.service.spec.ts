import { TestBed } from '@angular/core/testing';

import { RetailGuestService } from './retail-guest.service';

describe('RetailGuestService', () => {
  let service: RetailGuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailGuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
