import { TestBed } from '@angular/core/testing';

import { AgeCategoriesService } from './age-categories.service';
import {ReportsApiService} from '../../../shared/reports-api/reports-api.service';

describe('AgeCategoriesService', () => {
    beforeEach(() => {
        const reportsApiSpy = jasmine.createSpyObj('ReportsApiService', ['get']);
        TestBed.configureTestingModule({
            providers: [
                {provide: ReportsApiService, useValue: reportsApiSpy}
            ]
        });
    });

    it('should be created', () => {
        const service: AgeCategoriesService = TestBed.get(AgeCategoriesService);
        expect(service).toBeTruthy();
    });
});
