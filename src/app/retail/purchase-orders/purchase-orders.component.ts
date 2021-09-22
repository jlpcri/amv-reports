import {AfterViewInit, Component} from '@angular/core';
import {Subject} from 'rxjs';
import {ReportService} from '../../shared/report/report.service';
import {TableDataSource} from '../../shared/data-table/tableDataSource';

import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {PurchaseOrder} from '../../shared/types/purchaseOrder';
import {COLUMNS} from './purchase-orders.columns';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.css'],
    providers: [ReportService]
})
export class PurchaseOrdersComponent implements AfterViewInit {
    title = 'Purchase Order Report';
    selectedSource: number;
    selectedSource$ = new Subject<number>();
    sites: any[] = [];

    constructor(public reportService: ReportService<PurchaseOrder>) {
        reportService.dataSource = new TableDataSource<PurchaseOrder>(COLUMNS, this.title);
        reportService.fetchByPage = true;
        reportService.formatResponse = (response) => response;
        reportService.reportEndpoint = '/retail/purchase-order';
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
