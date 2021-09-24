import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {IdScan} from './id-scan.model';
import {ProgressService} from '../../../shared/progress-bar/shared/progress.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {ReportsApiService} from '../../../shared/reports-api/reports-api.service';
import {Invoice} from '../../../shared/types/invoice';

@Injectable({
    providedIn: 'root'
})

export class IdScanService {

    DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss';

    constructor(private reportsApiService: ReportsApiService,
                private progressService: ProgressService
    ) { }

    retrieveIncrement(startDate: Moment, stopDate: Moment, increment: string, current: number, total: number, complete: Subject<boolean>) {
        if (startDate.isAfter(stopDate)) {
            this.progressService.progressPercent = 100;
            this.progressService.loading = false;
            complete.next(true);
            return;
        }
        this.progressService.progressPercent = (current / total * 100);
        const nextDate = moment(startDate).add(1, 'month');
        this.retrieve(startDate.format(this.DATE_FORMAT), nextDate.format(this.DATE_FORMAT)).subscribe(() => {
            this.retrieveIncrement(moment(startDate).add(1, 'month'), stopDate, increment, current + 1, total, complete);
        });
    }

    retrieve(startDate: string, stopDate: string) {
        const idScans = new Subject<IdScan[]>();
        const options = {
            params: new HttpParams().set('startDate', startDate).set('stopDate', stopDate)
        };
        this.reportsApiService.get<IdScan[]>('/idscans', options).subscribe(
            resp => {
                resp.forEach( scan => {
                    if (scan.age === 0) {
                        scan.age = undefined;
                    }
                });
                idScans.next(resp);
            },
            error => {
                // error message handler
            }
        );
        return idScans;
    }

    retrieveInvoices(startDate: string, stopDate: string) {
        const complete = new Subject<Invoice[]>();
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
