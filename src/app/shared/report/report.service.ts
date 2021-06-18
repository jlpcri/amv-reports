import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ProgressService } from '../../shared/progress-bar/shared/progress.service';
import { Moment } from 'moment';
import { ReportsApiService} from '../../shared/reports-api/reports-api.service';
import { Region } from '../../shared/types/region';
import { Site } from '../../shared/types/site';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TableDataSource} from '../data-table/tableDataSource';

@Injectable()
export class ReportService<T> {
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

    constructor(private reportsApiService: ReportsApiService,
                private progressService: ProgressService,
                private snackBar: MatSnackBar,
                ) {
        this.date$.subscribe({
            // currently reports are viewable by month but Material date picker selects a day
            next: date => {
                this.startDate = date.startOf('month').toISOString();
                this.stopDate = date.endOf('month').toISOString();
                if (this.selectedSites.length > 0 || this.selectedSource) {
                    this.getReportData();
                }
            }
        });
        this.selectedSites$.subscribe({
            // when selected sites are updated in form, refresh reportData
            next: sites => {
                this.selectedSites = sites;
                if (this.selectedSites.length > 0) {
                    this.getReportData();
                } else {
                    this.reportData$.next([]);
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
                this.reportData$.next(undefined);
            }
        });
        this.progressService.cancel$.subscribe(() => {
            this.dataSource.data$.next([]);
        });
        this.reportData$.subscribe({
            next: reportData => {
                this.dataSource.data$.next([...this.dataSource.data, ...reportData]);
            }
        });
    }

    getSites() {
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
            params = params.set('sites', this.selectedSites.toString());
        }

        if (this.selectedRegion) {
            params = params.set('region', this.selectedRegion);
        }

        if (this.selectedSource) {
            params = params.set('sourceSystem', this.selectedSource.toString());
        }

        this.reportsApiService.getDateRange<T[]>(this.reportEndpoint, this.startDate, this.stopDate, {params}).subscribe(
            reportData => {
                this.reportData$.next(this.formatResponse(reportData));
            },
            error => {
                // Progress will already be cancelled.
                this.displayError('Error loading report data.');
            }
        );
    }

    displayError(message: string) {
        this.snackBar.open(message, 'Dismiss', { duration: 15000 });
    }
}
