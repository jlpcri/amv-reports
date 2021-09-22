import { TestBed } from '@angular/core/testing';

import { EcommSkusService } from './ecomm-skus.service';
import {ReportsApiService} from '../../shared/reports-api/reports-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

describe('EcommSkusService', () => {
  let service: EcommSkusService;

  beforeEach(() => {
    const reportsApiSpy = jasmine.createSpyObj('ReportsApiService', ['get']);
    const snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
        providers: [
            { provide: ReportsApiService, useValue: reportsApiSpy },
            { provide: MatSnackBar, useValue: snackbarSpy}
        ]
    });
    service = TestBed.inject(EcommSkusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
