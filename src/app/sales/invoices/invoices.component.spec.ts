import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { InvoicesComponent } from './invoices.component';
import { InvoiceService } from './invoice.service';
import { Subject } from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {SalesModule} from '../sales.module';

describe('InvoicesComponent', () => {
    let component: InvoicesComponent;
    let fixture: ComponentFixture<InvoicesComponent>;

    beforeEach(async(() => {
        const mockInvoiceService = {
            invoices$: new Subject(),
            sites$: new Subject(),
            selectedSites$: new Subject(),
            date$: new Subject(),
            regions$: new Subject(),
            getRegions: () => {},
            selectedRegions$: new Subject()
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
                {provide: InvoiceService, useValue: mockInvoiceService},
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
