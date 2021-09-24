import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ValuationReportComponent} from './valuation-report.component';
import {ReportService} from '../../shared/report/report.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Overlay} from '@angular/cdk/overlay';

describe('ValuationReportComponent', () => {
    let component: ValuationReportComponent;
    let fixture: ComponentFixture<ValuationReportComponent>;

    beforeEach(async(() => {
        const reportService = {};
        TestBed.configureTestingModule({
            declarations: [ValuationReportComponent],
            imports: [HttpClientTestingModule],
            providers: [
                MatSnackBar, Overlay,
                {provide: ReportService, useValue: reportService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ValuationReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
