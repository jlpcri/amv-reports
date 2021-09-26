import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Invoice} from '../../shared/types/invoice';
import {Subject} from 'rxjs';
import {TableDataSource} from '../../shared/data-table/tableDataSource';
import {COLUMNS} from './invoices.columns';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ReportService} from '../../shared/report/report.service';

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements AfterViewInit, OnDestroy {
    title = 'Invoice Report';
    selectedSites: number[] = [];
    selectedSites$ = new Subject<number[]>();
    sites: any[] = [];

    selectedRegion = 'All';
    selectedRegion$ = new Subject<string>();
    regions: any[] = [];

    constructor(public reportService: ReportService<Invoice>) {
        reportService.dataSource = new TableDataSource<Invoice>(COLUMNS, this.title);
        reportService.formatResponse = (response) => response;
        reportService.reportEndpoint = '/invoices';
        reportService.siteEndpoint = '/invoice-sites';
        reportService.dateRefresh = true;

        this.selectedSites$.pipe(debounceTime(1000), distinctUntilChanged()).subscribe({
            next: sites => {
                this.selectedSites = sites;
                this.reportService.selectedSites$.next(sites);
            }
        });

        this.selectedRegion$.pipe(debounceTime(1000), distinctUntilChanged()).subscribe({
            next: region => {
                this.selectedRegion = region;
                this.reportService.selectedRegion$.next(region);
            }
        });

        this.reportService.regions$.subscribe({
            next: regions => {
                this.regions = regions;
                this.selectedRegion$.next('All');
            }
        });

        this.reportService.sites$.subscribe(sites => {
            this.sites = sites;
        });
    }

    ngAfterViewInit() {
        this.reportService.getRegions();
        this.reportService.getSites();
    }

    ngOnDestroy() {
        this.selectedRegion$.complete();
        this.selectedSites$.complete();
    }
}
