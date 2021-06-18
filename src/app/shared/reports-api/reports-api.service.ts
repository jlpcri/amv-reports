import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {from, Observable, Subject} from 'rxjs';
import * as moment from 'moment';
import {concatMap, takeUntil} from 'rxjs/operators';
import {Moment} from 'moment';
import {ProgressService} from '../progress-bar/shared/progress.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsApiService {

    private baseUrl = '/amv-reports/api/v1';
    private DAYS_PER_REQUEST = 5;
    private interrupt$ = new Subject<any>();

    constructor(private http: HttpClient, private progressService: ProgressService) { }

    get<T>(url: string, options?: {}): Observable<T> {
        const response$: Subject<T> = new Subject<T>();
        this.http.get<T>(this.baseUrl + url, options).subscribe(
            resp => response$.next(resp),
            error => {
                if (error.url.endsWith('/login.html')) {
                    window.location = error.url;
                } else {
                    console.error(error);
                    response$.error(error);
                }
            }
        );
        return response$;
    }

    getDateRange<T>(url: string, startDate, stopDate, options?: { params? }): Observable<T> {
        const responses$: Subject<T> = new Subject<T>();

        // Generate a list of start/stop dates for multiple API calls
        const dates: [Moment, Moment][] = [];
        const nextDate = moment(startDate);
        while (nextDate.isBefore(stopDate)) {
            const start = moment(nextDate);
            nextDate.add(this.DAYS_PER_REQUEST, 'days');
            const end = nextDate.isBefore(stopDate) ? moment(nextDate).subtract(1, 'second') : moment(stopDate);
            dates.push([start, end]);
        }

        this.progressService.loading = true;
        this.progressService.totalCount = dates.length;

        from(dates).pipe(
            concatMap(datePair => {
                const datedParams = (options.params ?? new HttpParams())
                    .set('startDate', datePair[0].toISOString())
                    .set('stopDate', datePair[1].toISOString());
                return this.http.get<T>(this.baseUrl + url, {...options, params: datedParams});
            }),
            takeUntil(this.progressService.cancel$)
        ).subscribe(
            resp => {
                responses$.next(resp);
                this.progressService.progress$.next();
            },
            error => {
                this.progressService.cancel$.next();
                if (error.url.endsWith('/login.html')) {
                    window.location = error.url;
                } else {
                    console.error(error);
                    responses$.error(error);
                }
            }
        );

        return responses$;
    }
}
