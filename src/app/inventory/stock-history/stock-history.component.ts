import { Component } from '@angular/core';
import {StockHistory} from '../../shared/types/stockHistory';
import { COLUMNS } from './stock-history.columns';
import {ReportService} from '../../shared/report/report.service';
import {TableDataSource} from '../../shared/data-table/tableDataSource';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-stock-summary',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.css'],
    providers: [ReportService]
})
export class StockHistoryComponent {
    sourceSystems = [
        { name: 'vtm', description: 'Finale Warehouse' },
        { name: 'dfv', description: 'IL Warehousing System'}
    ];
    title = 'Stock History Report';
    selectedSource$ = new Subject<string>();
    selectedSource: string;

  constructor(public reportService: ReportService<StockHistory>) {
        reportService.dataSource = new TableDataSource<StockHistory>(COLUMNS, this.title);
        reportService.formatResponse = (response) => response.records;
        reportService.reportEndpoint = '/inventory/stock-history';

        this.selectedSource$.pipe(debounceTime(1000), distinctUntilChanged()).subscribe({
          next: sourceSystem => {
              this.selectedSource = sourceSystem;
              this.reportService.selectedSource$.next(sourceSystem);
          }
      });
    }
}
