import { TestBed } from '@angular/core/testing';

import { ShippedService } from './shipped.service';
import {ReportsApiService} from '../../shared/reports-api/reports-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProgressService} from '../../shared/progress-bar/shared/progress.service';
import {InvoiceService} from '../invoices/invoice.service';

describe('ShippedService', () => {

  beforeEach(() => {
      const reportsApiSpy = jasmine.createSpyObj('ReportsApiService', ['get']);
      const snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
      TestBed.configureTestingModule({
          providers: [
              { provide: ReportsApiService, useValue: reportsApiSpy },
              {provide: MatSnackBar, useValue: snackbarSpy},
              ProgressService
          ]
      });
  });

  it('should be created', () => {
    const service: ShippedService = TestBed.get(ShippedService);
    expect(service).toBeTruthy();
  });
});
