import {TestBed} from '@angular/core/testing';

import {RetailGuestService} from './retail-guest.service';
import {ReportsApiService} from '../../../shared/reports-api/reports-api.service';
import {ProgressService} from '../../../shared/progress-bar/shared/progress.service';

describe('RetailGuestService', () => {
    let service: RetailGuestService;

    beforeEach(() => {
        const reportsApiSpy = jasmine.createSpyObj('ReportsApiService', ['get']);
        TestBed.configureTestingModule({
            providers: [
                ProgressService,
                { provide: ReportsApiService, useValue: reportsApiSpy }
            ]
        });
        service = TestBed.inject(RetailGuestService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
