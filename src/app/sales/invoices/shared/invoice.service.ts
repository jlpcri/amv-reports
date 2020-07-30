import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Invoice} from "./invoice.model";
import {ProgressService} from "../../../shared/progress-bar/shared/progress.service";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient, private progressService: ProgressService) { }

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
