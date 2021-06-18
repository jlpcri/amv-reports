import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { InvoicesComponent } from './invoices.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {SalesModule} from '../sales.module';
import {ReportService} from '../../shared/report/report.service';
import {ReportsApiService} from '../../shared/reports-api/reports-api.service';

describe('InvoicesComponent', () => {
    let component: InvoicesComponent;
    let fixture: ComponentFixture<InvoicesComponent>;

    beforeEach(async(() => {
        const reportService = {
            getRegions: jasmine.createSpy().and.stub(),
            getSites: jasmine.createSpy().and.stub(),
            regions$: {
                pipe: jasmine.createSpy()
            },
            sites$: {
                pipe: jasmine.createSpy()
            }
        };
        const reportsApiService = {
            get: () => {
                return {
                    subscribe: jasmine.createSpy()
                };
            },
        };

        TestBed.configureTestingModule({
            declarations: [ InvoicesComponent ],
            imports: [
                NoopAnimationsModule,
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
                MatFormFieldModule,
                MatSelectModule,
                SalesModule
            ],
            providers: [
                {provide: ReportService, useValue: reportService},
                {provide: ReportsApiService, useValue: reportsApiService}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InvoicesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should compile', () => {
        expect(component).toBeTruthy();
    });
});
