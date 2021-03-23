import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { InvoicesComponent } from './invoices.component';
import { InvoiceService } from './invoice.service';
import { Subject } from 'rxjs';

describe('InvoicesComponent', () => {
    let component: InvoicesComponent;
    let fixture: ComponentFixture<InvoicesComponent>;

    beforeEach(async(() => {
        const mockInvoiceService = {
            invoices$: new Subject(),
            stores$: new Subject(),
            selectedStores$: new Subject(),
            date$: new Subject()
        };

        TestBed.configureTestingModule({
            declarations: [ InvoicesComponent ],
            imports: [
                NoopAnimationsModule,
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
            ],
            providers: [
                {provide: InvoiceService, useValue: mockInvoiceService}
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
