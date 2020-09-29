import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommSkuComponent } from './ecomm-sku.component';
import {ReportsApiService} from '../../shared/reports-api/reports-api.service';

describe('EcommSkuComponent', () => {
    let component: EcommSkuComponent;
    let fixture: ComponentFixture<EcommSkuComponent>;

    beforeEach(async(() => {
        const reportsApiSpy = jasmine.createSpyObj('ReportsApiService', ['get']);
        TestBed.configureTestingModule({
            declarations: [ EcommSkuComponent ],
            providers: [
                { provide: ReportsApiService, useValue: reportsApiSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EcommSkuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
