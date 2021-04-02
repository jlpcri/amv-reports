import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ProgressService } from '../../shared/progress-bar/shared/progress.service';
import { Moment } from 'moment';
import { ReportsApiService} from '../../shared/reports-api/reports-api.service';
import { Invoice } from '../../shared/types/invoice';
import { Region } from '../../shared/types/region';
import { Site } from '../../shared/types/site';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
    date$ = new Subject<Moment>();
    invoices$ = new Subject<Invoice[]>();
    regions$ = new Subject<Region[]>();
    selectedRegion$ = new Subject<string>();
    selectedRegion: string;
    startDate: string;
    stopDate: string;
    sites$ = new Subject<Site[]>();
    sites: Site[] = [];
    selectedSites$ = new Subject<number[]>();
    selectedSites: number[] = [];

    constructor(private reportsApiService: ReportsApiService, private progressService: ProgressService, private snackBar: MatSnackBar) {
        this.date$.subscribe({
            // currently reports are viewable by month but Material date picker selects a day
            next: date => {
                this.startDate = date.startOf('month').toISOString();
                this.stopDate = date.endOf('month').toISOString();
                this.getSites();
            }
        });
        this.selectedSites$.subscribe({
            // when selected sites are updated in form, refresh invoices
            next: sites => {
                this.selectedSites = sites;
                this.getInvoices();
            }
        });
        this.selectedRegion$.subscribe({
            next: region => {
                if (region === 'All') { region = undefined; }
                this.selectedRegion = region;
                this.getInvoices();
            }
        });
    }

    getSites() {
        this.progressService.progressMessage = 'Loading Sites...';
        // gets a list of sites that have invoices in the provided period
        const params = new HttpParams()
            .set('startDate', this.startDate)
            .set('stopDate', this.stopDate)
            .set('channel', 'ecomm');

        this.reportsApiService.get<Site[]>('/invoice-sites', {params}).subscribe(
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

    getInvoices() {
        // actually gets the invoices for the main invoice report
        this.progressService.progressMessage = 'Loading Invoices...';
        this.progressService.loading = true;

        let params = new HttpParams()
            .set('startDate', this.startDate)
            .set('stopDate', this.stopDate)
            .set('channel', 'ecomm')
            .set('sites', this.selectedSites.toString());

        if (this.selectedRegion) {
            params = params.set('region', this.selectedRegion);
        }

        this.reportsApiService.get<Invoice[]>('/invoices', {params}).subscribe(
            invoices => {
                this.invoices$.next(invoices);
                this.progressService.loading = false;
            },
            error => {
                this.invoices$.next([]);
                this.progressService.loading = false;
                this.displayError('Error loading invoices.');
            }
        );
    }

    getRegions() {
        // gets regions, currently just US states
        this.progressService.progressMessage = 'Loading Regions...';
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
