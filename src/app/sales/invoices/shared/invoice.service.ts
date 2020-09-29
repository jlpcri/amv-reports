import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Invoice} from './invoice.model';
import {ProgressService} from '../../../shared/progress-bar/shared/progress.service';
import {Moment} from 'moment';
import {ReportsApiService} from '../../../shared/reports-api/reports-api.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

    constructor(private reportsApiService: ReportsApiService, private progressService: ProgressService) { }

    retrieveIncrement(startDate: Moment, stopDate: Moment, current: number, total: number, complete: Subject<boolean>) {
        if (startDate.isAfter(stopDate)) {
            this.progressService.progressPercent = 100;
            this.progressService.loading = false;
            complete.next(true);
            return;
        }
        this.progressService.progressPercent = (current / total * 100);
    }

    retrieveAll(startDate: string, stopDate: string) {
        const complete = new Subject<Invoice[]>();
        let page = 1;
        let invoices = [];

        this.progressService.progressMessage = 'Loading Invoices...';
        this.progressService.loading = true;

        const options = {
                params: new HttpParams()
                    .set('startDate', startDate)
                    .set('stopDate', stopDate)
                    .set('channel', 'retail')
            };

        this.reportsApiService.get<Invoice[]>('/invoices', options).subscribe(
            resp => {
                invoices = resp;
                console.log('records: ' + resp.length);
                console.log('invoices: ' + invoices.length);
                complete.next(invoices);
                this.progressService.loading = false;
            },
            error => {
                // error message handler
                complete.next(invoices);
                this.progressService.loading = false;
            });

        return complete;
    }
}
