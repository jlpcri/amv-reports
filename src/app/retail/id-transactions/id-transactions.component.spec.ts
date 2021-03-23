import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdTransactionsComponent } from './id-transactions.component';
import {IdScanService} from '../id-scans/shared/id-scan.service';
import {InvoiceService} from '../../sales/invoices/invoice.service';
import {OptionService} from '../../shared/option.service';
import {ProgressService} from '../../shared/progress-bar/shared/progress.service';

describe('IdTransactionsComponent', () => {
    let component: IdTransactionsComponent;
    let fixture: ComponentFixture<IdTransactionsComponent>;

    beforeEach(async(() => {
        const idScanServiceSpy = jasmine.createSpyObj('IdScanService', ['retrieve']);
        const invoiceServiceSpy = jasmine.createSpyObj('InvoiceService', ['retrieve']);
        TestBed.configureTestingModule({
            declarations: [ IdTransactionsComponent ],
            providers: [
                OptionService,
                ProgressService,
                { provide: IdScanService, useValue: idScanServiceSpy },
                { provide: InvoiceService, useValue: invoiceServiceSpy },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IdTransactionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
