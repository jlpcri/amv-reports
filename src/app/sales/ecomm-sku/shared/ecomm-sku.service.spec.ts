import { TestBed } from '@angular/core/testing';
import {EcommSkuService} from './ecomm-sku.service';
import {ReportsApiService} from '../../../shared/reports-api/reports-api.service';

describe('EcomSkuService', () => {
    beforeEach(() => {
        const reportsApiSpy = jasmine.createSpyObj('ReportsApiService', ['get']);
        TestBed.configureTestingModule({
            providers: [
                {provide: ReportsApiService, useValue: reportsApiSpy}
            ]
        });
    });

    it('should be created', () => {
        const service: EcommSkuService = TestBed.get(EcommSkuService);
        expect(service).toBeTruthy();
    });
});
