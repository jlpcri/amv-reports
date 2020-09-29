import { TestBed } from '@angular/core/testing';

import { IdScanService } from './id-scan.service';
import {ReportsApiService} from '../../../shared/reports-api/reports-api.service';

describe('IdScanService', () => {
    beforeEach(() => {
        const reportsApiSpy = jasmine.createSpyObj('ReportsApiService', ['get']);
        TestBed.configureTestingModule({
            providers: [
                {provide: ReportsApiService, useValue: reportsApiSpy}
            ]
        });
    });

    it('should be created', () => {
        const service: IdScanService = TestBed.get(IdScanService);
        expect(service).toBeTruthy();
    });
});
