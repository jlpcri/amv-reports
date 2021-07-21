import {Injectable, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ProgressService } from '../../shared/progress-bar/shared/progress.service';
import { Moment } from 'moment';
import { ReportsApiService} from '../../shared/reports-api/reports-api.service';
import { Region } from '../../shared/types/region';
import { Site } from '../../shared/types/site';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TableDataSource} from '../data-table/tableDataSource';
import {takeUntil} from 'rxjs/operators';

@Injectable()
export class ReportService<T> implements OnDestroy {
    date$ = new Subject<Moment>();
    reportData$ = new Subject<T[]>();
    regions$ = new Subject<Region[]>();
    selectedRegion$ = new Subject<string>();
    selectedRegion: string;
    startDate: string;
    stopDate: string;
    sites$ = new Subject<Site[]>();
    sites: Site[] = [];
    selectedSites$ = new Subject<number[]>();
    selectedSites: number[] = [];
    selectedSource$ = new Subject<string>();
    selectedSource: string;
    reportEndpoint: string;
    siteEndpoint: string;
    formatResponse: (response: any) => any;
    dataSource: TableDataSource<T>;
    fetchByPage = false;
    unsubscribe$ = new Subject<void>();
    multipleSites = true;
    fixedSites = false;

    constructor(private reportsApiService: ReportsApiService,
                private progressService: ProgressService,
                private snackBar: MatSnackBar,
                ) {
        this.date$.subscribe({
            // currently reports are viewable by month but Material date picker selects a day
            next: date => {
                this.startDate = date.startOf('month').toISOString();
                this.stopDate = date.endOf('month').toISOString();
                this.getSites();
            }
        });
        this.selectedSites$.subscribe({
            // when selected sites are updated in form, refresh reportData
            next: sites => {
                this.selectedSites = sites;
                if (this.selectedSites.length > 0) {
                    this.getReportData();
                } else {
                    this.reportData$.next();
                }
            }
        });
        this.selectedRegion$.subscribe({
            next: region => {
                if (region === 'All') { region = undefined; }
                this.selectedRegion = region;
                if (this.selectedSites.length > 0) {
                    this.getReportData();
                }
            }
        });
        this.selectedSource$.subscribe( sourceSystem => {
            this.selectedSource = sourceSystem;
            if (this.selectedSource) {
                this.getReportData();
            } else {
                this.reportData$.next();
            }
        });
        this.progressService.cancel$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.dataSource.data$.next();
        });
        this.reportData$.subscribe({
            next: reportData => {
                this.dataSource.data$.next(reportData);
            }
        });
    }

    getSites() {
        if (this.fixedSites) {
            return;
        }
        this.progressService.loading = true;
        // gets a list of sites that have reportData in the provided period
        const params = new HttpParams()
            .set('startDate', this.startDate)
            .set('stopDate', this.stopDate)
            .set('channel', 'ecomm');

        this.reportsApiService.get<Site[]>(this.siteEndpoint, {params}).subscribe(
            sites => {
                this.sites$.next(sites);
                this.progressService.loading = false;
            },
            error => {
                this.displayError('Error loading sites.');
                this.progressService.loading = false;
            }
        );
    }

    getRegions() {
        // gets regions, currently just US states
        this.reportsApiService.get<Region[]>('/regions', {}).subscribe(
            regions => {
                this.regions$.next(regions);
            },
            error => {
                this.regions$.next([]);
                this.displayError('Error loading regions.');
            }
        );
    }

    getReportData() {
        this.progressService.cancel$.next(); // cancel anything currently going

        let params = new HttpParams();

        if (this.selectedSites.length > 0) {
            const param = this.multipleSites ? 'sites' : 'site';
            params = params.set(param, this.selectedSites.toString());
        }

        if (this.selectedRegion) {
            params = params.set('region', this.selectedRegion);
        }

        if (this.selectedSource) {
            params = params.set('sourceSystem', this.selectedSource.toString());
        }

        if (this.fetchByPage) {
            // Gets as many pages of API data as are necessary.  Will keep fetching until complete or cancelled.
            // Does not match table pagination but this will ultimately load much faster.
            this.reportsApiService.getByPage<T>(this.reportEndpoint, this.startDate, this.stopDate, {params}).subscribe(
                reportData => {
                    this.dataSource.totalRecords = reportData.totalRecords;
                    this.reportData$.next(this.formatResponse(reportData.records));
                },
                () => this.loadingError()
            );
        } else {
            // Break into blocks of dates to retrieve more manageable number of rows if no pagination available yet
            this.reportsApiService.getDateRange<T[]>(this.reportEndpoint, this.startDate, this.stopDate, {params}).subscribe(
                reportData => {

                    this.reportData$.next(this.formatResponse(reportData));
                },
                () => this.loadingError()
            );
        }
    }

    loadingError() {
        this.displayError('Error loading report data.');
    }

    displayError(message: string) {
        this.snackBar.open(message, 'Dismiss', { duration: 15000 });
    }

    ngOnDestroy() {
        this.dataSource.disconnect();
        this.unsubscribe$.next();

        const toComplete = [
            this.date$,
            this.reportData$,
            this.regions$,
            this.selectedRegion$,
            this.sites$,
            this.selectedSites$,
            this.selectedSource$,
            this.unsubscribe$
        ];
        toComplete.forEach((obs) => {
            obs.complete();
        });
    }
}
