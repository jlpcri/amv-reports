import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {defer, from, Observable, Subject} from 'rxjs';
import * as moment from 'moment';
import {concatMap, repeatWhen, takeUntil} from 'rxjs/operators';
import {Moment} from 'moment';
import {ProgressService} from '../progress-bar/shared/progress.service';
import {PagedResponse} from '../types/pagedResponse';

@Injectable({
  providedIn: 'root'
})
export class ReportsApiService {
    private baseUrl = '/amv-reports/api/v1';
    private daysPerRequest = 5;
    private pageSize = 1000;

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
            nextDate.add(this.daysPerRequest, 'days');
            const end = nextDate.isBefore(stopDate) ? moment(nextDate).subtract(1, 'second') : moment(stopDate);
            dates.push([start, end]);
        }

        this.progressService.loading = true;
        this.progressService.totalCount = dates.length;

        from(dates).pipe(
            concatMap(datePair => {
                // Create requests for every chunk of dates
                const datedParams = (options.params ?? new HttpParams())
                    .set('startDate', datePair[0].toISOString())
                    .set('stopDate', datePair[1].toISOString());
                return this.http.get<T>(this.baseUrl + url, {...options, params: datedParams});
            }),
            takeUntil(this.progressService.cancel$) // allow outside cancellation for large requests
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

    getByPage<T>(url: string, startDate, stopDate, options?: { params? }): Observable<PagedResponse<T>> {
        const responses$: Subject<PagedResponse<T>> = new Subject<PagedResponse<T>>();

        let currentPage = 0;
        let params = options.params
            .set('startDate', startDate)
            .set('stopDate', stopDate)
            .set('page', currentPage)
            .set('size', this.pageSize);

        this.progressService.loading = true;

        // defer allows the params to be updated between calls
        defer(
            () => this.http.get<PagedResponse<T>>(this.baseUrl + url, {...options, params})
        ).pipe(
            repeatWhen(completed => completed),
            takeUntil(this.progressService.done$), // keep going until progress complete or cancelled
        ).subscribe(
            (resp) => {
                // Offset query is vulnerable to records changing between API calls but this should happen rarely with reporting data
                // Keep most recent total to be as close to accurate as possible.
                this.progressService.totalCount = resp.totalRecords;

                // Update params for next page.
                currentPage += 1;
                params = params.set('page', currentPage);

                responses$.next(resp); // Have report service handle the actual data.

                // Update progress.
                this.progressService.progress$.next(resp.records.length);

                if (resp.records.length < this.pageSize) {
                    // Complete if it got less than a full page, even if the totals don't match.
                    this.progressService.done$.next();
                }
            },
            error => {
                this.progressService.cancel$.next(); // Make sure API calls stop.
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
