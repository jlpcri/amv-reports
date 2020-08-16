import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Invoice} from "./invoice.model";
import {ProgressService} from "../../../shared/progress-bar/shared/progress.service";
import * as moment from "moment";
import {Moment} from "moment";
import {IndexedDatabaseService} from "../../../shared/indexed-database.service";
import {IdScan} from "../../../retail/id-scans/shared/id-scan.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

    MIN_ORDER_DATE = "2019-04-01 04:00:00";
    DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss';

    constructor(private http: HttpClient,
                private progressService: ProgressService,
                private idb: IndexedDatabaseService) { }

    syncLatestInvoices(): Observable<boolean> {
        let subject = new ReplaySubject<boolean>();
        this.idb.maxValue('order','payment-date', 'paymentDate').subscribe((value) => {
            let min = moment(value === null ? this.MIN_ORDER_DATE : value);
            let max = moment();
            if (max.diff(min, 'minute') > 5) {
                let count = max.diff(min, 'week');
                if (count > 0) {
                    this.progressService.progressMessage = "Retrieving Invoices";
                    this.progressService.loading = true;
                }
                if (count > 2) {
                    this.progressService.progressPercent = 1;
                }
                this.retrieveIncrement(min, max, 1, count, subject)
            } else {
                subject.next(true);
            }
        });
        return subject;
    }

    retrieveIncrement(startDate: Moment, stopDate: Moment, current: number, total: number, complete: Subject<boolean>) {
        if (startDate.isAfter(stopDate)) {
            this.progressService.progressPercent = 100;
            this.progressService.loading = false;
            complete.next(true);
            return;
        }
        this.progressService.progressPercent = (current / total * 100);
        let nextDate = moment(startDate).add(1, 'week');
        this.retrieve(startDate.format(this.DATE_FORMAT), nextDate.format(this.DATE_FORMAT)).subscribe(() => {
            this.retrieveIncrement(moment(startDate).add(1, 'week'), stopDate, current + 1, total, complete);
        });
    }

    retrieve(startDate: string, stopDate: string) {
        let complete = new Subject<Invoice[]>();
        let options = {
            params: new HttpParams()
                .set('startDate', startDate)
                .set('stopDate', stopDate)
                .set('channel', 'retail')
        };
        this.http.get<Invoice[]>('/amv-reports/api/v1/invoices', options).subscribe(
            resp => {
                complete.next(resp);
            },
            error => {
                // error message handler
            }
        );
        return complete;
    }

    getInvoicesByChannel(startDate: string, stopDate: string, channel: string): Observable<Invoice[]> {
        this.progressService.progressMessage = "Loading Invoices...";
        this.progressService.loading = true;
        let invoices: Subject<Invoice[]> = new Subject<Invoice[]>();
        let options = {
            params: new HttpParams()
                .set('startDate', startDate)
                .set('stopDate', stopDate)
                .set('channel', channel)
        };
        this.http.get<Invoice[]>('/amv-reports/api/v1/invoices', options).subscribe(
            resp => {
                this.progressService.loading = false;
                invoices.next(resp);
            }, error => {
                this.progressService.loading = false;
            }
    );
        return invoices;
    }
}
