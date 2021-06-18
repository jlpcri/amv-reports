import { TestBed } from '@angular/core/testing';

import { ReportService } from './report.service';
import {ReportsApiService} from '../reports-api/reports-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Overlay} from '@angular/cdk/overlay';

describe('ReportService', () => {
  let service: ReportService<any>;

  beforeEach(() => {
      const reportsApiService = {
          get: () => {
              return {
                  subscribe: jasmine.createSpy()
              };
          },
      };
    TestBed.configureTestingModule({
        providers: [
            {provide: ReportsApiService, useValue: reportsApiService},
            ReportService,
            MatSnackBar,
            Overlay
        ]
    });
    service = TestBed.inject(ReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
