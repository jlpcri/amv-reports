import {Component, OnInit} from '@angular/core';
import {Invoice} from '../../shared/types/invoice';
import {Subject} from 'rxjs';
import {ProgressService} from '../../shared/progress-bar/shared/progress.service';
import {InvoiceService} from './invoice.service';
import * as moment from 'moment';
import {TableDataSource} from '../shared/data-table/tableDataSource';
import {COLUMNS} from './invoices.columns';

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit {
    dataSource: TableDataSource<Invoice>;

    displayedColumns$ = new Subject<string[]>();

    selectedSites: number[] = [];
    selectedSites$ = new Subject<number[]>();
    sites: any[] = [];

    selectedRegion = 'All';
    selectedRegion$ = new Subject<string>();
    regions: any[] = [];

    constructor(private progressService: ProgressService, public invoiceService: InvoiceService) {}

    ngOnInit() {
        this.dataSource = new TableDataSource<Invoice>(COLUMNS, 'Invoice Report');

        this.displayedColumns$.subscribe({
            next: columns => {
                this.dataSource.displayedColumns$.next(columns);
            }
        });

        this.displayedColumns$.next(this.dataSource.columns.map(col => col.field));

        this.invoiceService.invoices$.subscribe({
            next: invoices => {
                this.dataSource.data$.next(invoices);
            }
        });

        this.invoiceService.sites$.subscribe({
            next: sites => {
                this.sites = sites;
                this.selectedSites$.next([]);
            }
        });

        this.selectedSites$.subscribe({
            next: sites => {
                this.selectedSites = sites;
                this.invoiceService.selectedSites$.next(sites);
            }
        });

        this.invoiceService.regions$.subscribe({
            next: regions => {
                this.regions = regions;
                this.selectedRegion$.next('All');
            }
        });

        this.selectedRegion$.subscribe({
            next: region => {
                this.selectedRegion = region;
                this.invoiceService.selectedRegion$.next(region);
            }
        });

        // reset date on component init to load fresh after app routing
        this.invoiceService.date$.next(moment());

        this.invoiceService.getRegions();
        this.progressService.loading = true;

    }
}
