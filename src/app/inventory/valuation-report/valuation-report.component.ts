import {Component, OnDestroy} from '@angular/core';
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
        {name: 'vtm', description: 'Finale Warehouse'},
        {name: 'dfv', description: 'IL Warehousing System'}
    ];
    title = 'Inventory Valuation Report';
    selectedSource$ = new Subject<string>();
    selectedSource: string;

    constructor(private rptService: ReportService<InvValuation>) {
        rptService.dataSource = new TableDataSource<InvValuation>(COLUMNS, this.title);
        rptService.formatResponse = (response) => response;
        rptService.reportEndpoint = '/inventory/valuation';
        rptService.fixedSites = true;
        rptService.fetchByPage = true;
        rptService.dateRefresh = true;

        this.selectedSource$.pipe(debounceTime(1000), distinctUntilChanged()).subscribe({
            next: sourceSystem => {
                this.selectedSource = sourceSystem;
                this.reportService.selectedSource$.next(sourceSystem);
            }
        });
    }

    get reportService() {
        return this.rptService;
    }

    ngOnDestroy() {
        this.selectedSource$.complete();
    }
}
