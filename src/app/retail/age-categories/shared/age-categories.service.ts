import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProgressService} from "../../../shared/progress-bar/shared/progress.service";
import {GuestAges} from "./guest-ages.model";

@Injectable({
  providedIn: 'root'
})
export class AgeCategoriesService {

  constructor(private http: HttpClient, private progressService: ProgressService) { }

    retrieve(startDate: string, stopDate: string, ages: string) {
        let result = new Subject<GuestAges>();
        let options = {
            params: new HttpParams()
                .set('startDate', startDate)
                .set('stopDate', stopDate)
                .set('ages', ages)
        };
        this.progressService.loading = true;
        this.progressService.progressMessage = 'Loading Guest Age Categories';
        this.http.get<GuestAges>('/amv-reports/api/v1/guest-ages', options).subscribe(
            resp => {
                this.progressService.loading = false;
                result.next(resp);
            },
            error => {
                this.progressService.loading = false;
                // error message handler
            }
        );
        return result;
    }
}
