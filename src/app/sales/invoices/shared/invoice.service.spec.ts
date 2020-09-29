import { TestBed } from '@angular/core/testing';

import { InvoiceService } from './invoice.service';
import {ReportsApiService} from '../../../shared/reports-api/reports-api.service';

describe('InvoiceServiceService', () => {
  beforeEach(() => {
      const reportsApiSpy = jasmine.createSpyObj('ReportsApiService', ['get']);
      TestBed.configureTestingModule({
          providers: [
              { provide: ReportsApiService, useValue: reportsApiSpy }
          ]
      });
  });

  it('should be created', () => {
    const service: InvoiceService = TestBed.get(InvoiceService);
    expect(service).toBeTruthy();
  });
});
