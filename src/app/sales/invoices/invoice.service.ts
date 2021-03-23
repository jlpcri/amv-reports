import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ProgressService } from '../../shared/progress-bar/shared/progress.service';
import { Moment } from 'moment';
import { ReportsApiService} from '../../shared/reports-api/reports-api.service';
import { Invoice } from '../../shared/types/invoice';

interface Store {
    id: number;
    name: string;
    type: string;
    description: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
    date$ = new Subject<Moment>();
    invoices$ = new Subject<Invoice[]>();
    startDate: string;
    stopDate: string;
    stores$ = new Subject<Store[]>();
    stores: Store[] = [];
    selectedStores$ = new Subject<number[]>();
    selectedStores: number[] = [];

    constructor(private reportsApiService: ReportsApiService, private progressService: ProgressService) {
        this.date$.subscribe({
            // currently reports are viewable by month but Material date picker selects a day
            next: date => {
                this.startDate = date.startOf('month').toISOString();
                this.stopDate = date.endOf('month').toISOString();
                this.getStores();
            }
        });
        this.selectedStores$.subscribe({
            // when selected stores are updated in form, refresh invoices
            next: stores => {
                this.selectedStores = stores;
                this.getInvoices();
            }
        });

    }

    getStores() {
        // gets a list of stores that have invoices in the provided period
        const params = new HttpParams()
            .set('startDate', this.startDate)
            .set('stopDate', this.stopDate);

        this.reportsApiService.get<Store[]>('/invoice-stores', {params}).subscribe(
            stores => {
                this.stores$.next(stores);
            },
            error => {
                console.error('Error loading stores:', error);
            });
    }

    getInvoices() {
        // actually gets the invoices for the main invoice report
        this.progressService.progressMessage = 'Loading Invoices...';
        this.progressService.loading = true;

        let params = new HttpParams()
            .set('startDate', this.startDate)
            .set('stopDate', this.stopDate);

        if (this.selectedStores.length > 0) {
            // must reassign; params can't be mutated
            // takes an array of store IDs
            params = params.set('stores', this.selectedStores.toString());
        }

        this.reportsApiService.get<Invoice[]>('/invoices', {params}).subscribe(
            invoices => {
                this.invoices$.next(invoices);
                this.progressService.loading = false;
            },
            error => {
                this.invoices$.next([]);
                this.progressService.loading = false;
                console.error('Error loading invoices:', error);
            });
    }
}
