import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Invoice} from './invoice.model';
import {ProgressService} from '../../../shared/progress-bar/shared/progress.service';
import {Moment} from 'moment';
import {InvoiceList} from './invoice-list.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

    constructor(private http: HttpClient, private progressService: ProgressService) { }

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
        const invoices: Invoice[] = [];

        this.progressService.progressMessage = 'Loading Invoices...';
        this.progressService.loading = true;

        const retrieveNextPage = () => {
            const options = {
                params: new HttpParams()
                    .set('startDate', startDate)
                    .set('stopDate', stopDate)
                    .set('channel', 'retail')
                    .set('page', '' + page)
                    .set('pageSize', '10000')
            };
            this.http.get<InvoiceList>('/amv-reports/api/v1/invoices', options).subscribe(
                resp => {
                    invoices.concat(resp.records);
                    if (page < resp.totalPages) {
                        page++;
                        this.progressService.progressPercent = (100 * page / resp.totalPages);
                        retrieveNextPage();
                    } else {
                        this.progressService.progressPercent = 100;
                        complete.next(invoices);
                        this.progressService.loading = false;
                    }
                },
                error => {
                    // error message handler
                    complete.next(invoices);
                    this.progressService.loading = false;
                });
        };

        retrieveNextPage();
        return complete;
    }
}
