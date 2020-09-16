import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {ProgressService} from '../../../shared/progress-bar/shared/progress.service';
import {GuestAges} from './guest-ages.model';
import {ReportsApiService} from '../../../shared/reports-api/reports-api.service';

@Injectable({
  providedIn: 'root'
})
export class AgeCategoriesService {

  constructor(private reportsApiService: ReportsApiService, private progressService: ProgressService) { }

    retrieve(startDate: string, stopDate: string, ages: string) {
        const result = new Subject<GuestAges>();
        const options = {
            params: new HttpParams()
                .set('startDate', startDate)
                .set('stopDate', stopDate)
                .set('ages', ages)
        };
        this.progressService.loading = true;
        this.progressService.progressMessage = 'Loading Guest Age Groups';
        this.reportsApiService.get<GuestAges>('/guest-ages', options).subscribe(
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
