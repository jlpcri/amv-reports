import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Invoice} from "./invoice.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

    getInvoicesByChannel(startDate: string, stopDate: string, channel: string): Observable<Invoice[]> {
        let invoices: Subject<Invoice[]> = new Subject<Invoice[]>();
        let options = {
            params: new HttpParams()
                .set('startDate', startDate)
                .set('stopDate', stopDate)
                .set('channel', channel)
        };
        this.http.get<Invoice[]>('/amv-reports/api/v1/invoices', options).subscribe(
            resp => {
                invoices.next(resp);
            }
        );
        return invoices;
    }
}
