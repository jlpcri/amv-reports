import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IdScan} from "./id-scan.model";

@Injectable({
  providedIn: 'root'
})

export class IdScanService {

    constructor(private http: HttpClient) { }

    getIdScans(startDate: string, stopDate: string): Observable<IdScan[]> {
        let idScans: Subject<IdScan[]> = new Subject<IdScan[]>();
        let options = {
            params: new HttpParams().set('startDate', startDate).set('stopDate', stopDate)
        };
        this.http.get<IdScan[]>('/amv-reports/api/v1/idscans', options).subscribe(
            resp => {
                resp.forEach( scan => {
                    if (scan.age === 0)
                        scan.age = undefined;
                });
                idScans.next(resp);
            }
        );
        return idScans;
    }
}
