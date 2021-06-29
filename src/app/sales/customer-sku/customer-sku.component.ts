import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ReportService} from '../../shared/report/report.service';
import {CustomerSku} from '../../shared/types/customerSku';
import {TableDataSource} from '../../shared/data-table/tableDataSource';
import {COLUMNS} from './customer-sku.columns';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-customer-sku',
  templateUrl: './customer-sku.component.html',
  styleUrls: ['./customer-sku.component.css'],
    providers: [ReportService]
})
export class CustomerSkuComponent implements AfterViewInit {
    title = 'Customer SKU Report';
    selectedSource: number;
    selectedSource$ = new Subject<number>();
    sites: any[] = [];

    constructor(public reportService: ReportService<CustomerSku>) {
        reportService.dataSource = new TableDataSource<CustomerSku>(COLUMNS, this.title);
        reportService.fetchByPage = true;
        reportService.formatResponse = (response) => response;
        reportService.reportEndpoint = '/sales/customer-sku';
        reportService.siteEndpoint = '/invoice-sites';

        this.selectedSource$.pipe(debounceTime(1000), distinctUntilChanged()).subscribe({
            next: site => {
                this.selectedSource = site;
                this.reportService.selectedSource$.next(site.toString());
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
}
