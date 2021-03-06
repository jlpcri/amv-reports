import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IdScan} from "./id-scan.model";
import {ProgressService} from "../../../shared/progress-bar/shared/progress.service";
import {IndexedDatabaseService} from "../../../shared/indexed-database.service";
import * as moment from 'moment';
import {Duration, Moment} from "moment";
import {ReportsApiService} from '../../../shared/reports-api/reports-api.service';
import {Invoice} from '../../../shared/types/invoice';

@Injectable({
  providedIn: 'root'
})

export class IdScanService {

    MIN_ID_SCAN_DATE = "2019-04-01 04:00:00";
    DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss';

    constructor(private reportsApiService: ReportsApiService,
                private progressService: ProgressService,
                private idb: IndexedDatabaseService
    ) { }

    syncLatestIdScans(): Observable<boolean> {
        let subject = new ReplaySubject<boolean>();
        this.idb.maxValue('id-scan','event-timestamp', 'eventTimestamp').subscribe((value) => {
            let min = moment(value === null ? this.MIN_ID_SCAN_DATE : value);
            let max= moment();
            if (max.diff(min, 'minute') > 5) {
                let count = max.diff(min, 'month');
                if (count > 0) {
                    this.progressService.progressMessage = "Retrieving ID Scans";
                    this.progressService.loading = true;
                }
                if (count > 2) {
                    this.progressService.progressPercent = 1;
                }
                this.retrieveIncrement(min, max, 'month', 1, count, subject)
            } else {
                subject.next(true);
            }
        });
        return subject;
    }


    retrieveIncrement(startDate: Moment, stopDate: Moment, increment: string, current: number, total: number, complete: Subject<boolean>) {
        if (startDate.isAfter(stopDate)) {
            this.progressService.progressPercent = 100;
            this.progressService.loading = false;
            complete.next(true);
            return;
        }
        this.progressService.progressPercent = (current / total * 100);
        let nextDate = moment(startDate).add(1, 'month');
        this.retrieve(startDate.format(this.DATE_FORMAT), nextDate.format(this.DATE_FORMAT)).subscribe(() => {
            this.retrieveIncrement(moment(startDate).add(1, 'month'), stopDate, increment, current + 1, total, complete);
        });
    }

    retrieve(startDate: string, stopDate: string) {
        let idScans = new Subject<IdScan[]>();
        let options = {
            params: new HttpParams().set('startDate', startDate).set('stopDate', stopDate)
        };
        this.reportsApiService.get<IdScan[]>('/idscans', options).subscribe(
            resp => {
                resp.forEach( scan => {
                    if (scan.age === 0)
                        scan.age = undefined;
                });
                idScans.next(resp);
            },
            error => {
                // error message handler
            }
        );
        return idScans;
    }

    getRange(startDate: string, stopDate: string): Observable<IdScan[]> {
        let idScans = [];
        let subject = new Subject<IdScan[]>();
        console.log(startDate + ' -> ' + stopDate);
        this.idb.db.transaction('id-scan', "readonly")
            .objectStore('id-scan')
            .index('event-timestamp')
            .getAll(IDBKeyRange.bound(startDate, stopDate))
            .onsuccess = (event) => {
            console.log(event);
            if (event.target.result) {
                idScans = event.target.result;
            }
            subject.next(idScans);
        };
        return subject;
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
