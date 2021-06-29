import { TestBed } from '@angular/core/testing';

import { CustomerSkuService } from './customer-sku.service';

describe('CustomerSkuService', () => {
  let service: CustomerSkuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSkuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
