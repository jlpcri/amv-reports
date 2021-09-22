import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {TableDataSource} from '../../shared/data-table/tableDataSource';
import {ShippedItem} from '../../shared/types/shippedItem';
import {Subject} from 'rxjs';
import {COLUMNS} from './shipped.columns';
import {ReportService} from '../../shared/report/report.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-shipped',
  templateUrl: './shipped.component.html',
  styleUrls: ['./shipped.component.css'],
    providers: [ReportService]
})
export class ShippedComponent implements AfterViewInit, OnDestroy {
    title = 'Shipped Item Report';

    selectedSite: number;
    selectedSite$ = new Subject<number>();
    sites: any[] = [];

    selectedRegion: string;
    selectedRegion$ = new Subject<string>();
    regions: any[] = [];

    constructor(public reportService: ReportService<ShippedItem>) {
        reportService.dataSource = new TableDataSource<ShippedItem>(COLUMNS, this.title);
        reportService.formatResponse = (response) => response;
        reportService.reportEndpoint = '/shipped-items';
        reportService.siteEndpoint = '/shipped-sites';
        reportService.multipleSites = false;

        this.selectedSite$.pipe(debounceTime(1000), distinctUntilChanged()).subscribe({
            next: site => {
                this.selectedSite = site;
                this.reportService.selectedSites$.next([site]);
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
        this.selectedSite$.complete();
    }
}
