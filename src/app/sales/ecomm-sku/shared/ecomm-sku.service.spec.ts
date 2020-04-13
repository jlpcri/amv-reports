import { TestBed } from '@angular/core/testing';
import {EcommSkuService} from "./ecomm-sku.service";


describe('EcomSkuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EcommSkuService = TestBed.get(EcommSkuService);
    expect(service).toBeTruthy();
  });
});
