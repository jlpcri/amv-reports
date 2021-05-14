import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Moment} from 'moment';
import {ShippedItem} from '../../shared/types/shippedItem';
import {Region} from '../../shared/types/region';
import {Site} from '../../shared/types/site';
import {ReportsApiService} from '../../shared/reports-api/reports-api.service';
import {ProgressService} from '../../shared/progress-bar/shared/progress.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShippedService {
    date$ = new Subject<Moment>();
    shippedItems$ = new Subject<ShippedItem[]>();
    regions$ = new Subject<Region[]>();
    selectedRegion$ = new Subject<string>();
    selectedRegion: string;
    startDate: string;
    stopDate: string;
    sites$ = new Subject<Site[]>();
    sites: Site[] = [];
    selectedSite$ = new Subject<number>();
    selectedSite: number;

    constructor(private reportsApiService: ReportsApiService, private progressService: ProgressService, private snackBar: MatSnackBar) {
        this.date$.subscribe({
            // currently reports are viewable by month but Material date picker selects a day
            next: date => {
                this.startDate = date.startOf('month').toISOString();
                this.stopDate = date.endOf('month').toISOString();
                this.getSites();
            }
        });
        this.selectedSite$.subscribe({
            // when selected sites are updated in form, refresh shippedItems
            next: site => {
                this.selectedSite = site;
                if (site) {
                    this.getShippedItemsReport();
                } else {
                    this.shippedItems$.next([]);
                }
            }
        });
        this.selectedRegion$.subscribe({
            next: region => {
                this.selectedRegion = region;
                if (this.selectedSite && this.selectedRegion) {
                    this.getShippedItemsReport();
                }
            }
        });
    }

    getSites() {
        this.progressService.progressMessage = 'Loading sites...';
        // gets a list of sites that have shippedItems in the provided period
        const params = new HttpParams()
            .set('startDate', this.startDate)
            .set('stopDate', this.stopDate);

        this.reportsApiService.get<Site[]>('/shipped-sites', {params}).subscribe(
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

    getShippedItemsReport() {
        this.progressService.progressMessage = 'Loading shipped items...';
        this.progressService.loading = true;

        const params = new HttpParams()
            .set('startDate', this.startDate)
            .set('stopDate', this.stopDate)
            .set('site', this.selectedSite.toString())
            .set('region', this.selectedRegion);


        this.reportsApiService.get<ShippedItem[]>('/shipped-items', {params}).subscribe(
            shippedItems => {
                this.shippedItems$.next(shippedItems);
                this.progressService.loading = false;
            },
            error => {
                this.shippedItems$.next([]);
                this.progressService.loading = false;
                this.displayError('Error loading shipped items.');
            }
        );
    }

    getRegions() {
        // gets regions, currently just US states
        this.progressService.progressMessage = 'Loading regions...';
        this.progressService.loading = true;

        this.reportsApiService.get<Region[]>('/regions', {}).subscribe(
            regions => {
                this.regions$.next(regions);
                this.progressService.loading = false;
            },
            error => {
                this.regions$.next([]);
                this.progressService.loading = false;
                this.displayError('Error loading regions.');
            }
        );
    }

    displayError(message: string) {
        this.snackBar.open(message, 'Dismiss', { duration: 15000 });
    }
}
