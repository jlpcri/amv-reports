import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReportService} from '../../shared/report/report.service';
import {Subject} from 'rxjs';
import {InvValuation} from '../../shared/types/valuation';
import {TableDataSource} from '../../shared/data-table/tableDataSource';
import {COLUMNS} from './valuation-report.columns';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'app-valuation-report',
    templateUrl: './valuation-report.component.html',
    styleUrls: ['./valuation-report.component.css'],
    providers: [ReportService]
})
export class ValuationReportComponent implements OnDestroy {
    sourceSystems = [
        { name: 'vtm', description: 'Finale Warehouse' },
        { name: 'dfv', description: 'IL Warehousing System'}
    ];
    title = 'Inventory Valuation Report';
    selectedSource$ = new Subject<string>();
    selectedSource: string;

    constructor(public reportService: ReportService<InvValuation>) {
        reportService.dataSource = new TableDataSource<InvValuation>(COLUMNS, this.title);
        reportService.formatResponse = (response) => response;
        reportService.reportEndpoint = '/inventory/valuation';
        reportService.fixedSites = true;
        reportService.fetchByPage = true;
        reportService.dateRefresh = true;

        this.selectedSource$.pipe(debounceTime(1000), distinctUntilChanged()).subscribe({
            next: sourceSystem => {
                this.selectedSource = sourceSystem;
                this.reportService.selectedSource$.next(sourceSystem);
            }
        });


    }

    ngOnDestroy() {
        this.selectedSource$.complete();
    }
}
