import {Component, OnDestroy, OnInit} from '@angular/core';
import {IdScanService} from './shared/id-scan.service';
import {OptionService} from '../../shared/option.service';
import {DateRange} from '../../shared/date-range.model';
import {IdScan} from './shared/id-scan.model';
import {Subscription} from 'rxjs';
import {IdScanColumns} from './shared/id-scan-columns';
import {PageableTableColumn} from '../../shared/pageable-table/shared/pageable-table-column.model';
import {ProgressService} from '../../shared/progress-bar/shared/progress.service';
import _ from 'lodash';

@Component({
  selector: 'app-id-scans',
  templateUrl: './id-scans.component.html',
  styleUrls: ['./id-scans.component.css']
})
export class IdScansComponent implements OnInit, OnDestroy {

    idScans: IdScan[];
    idScanColumns: PageableTableColumn[] = IdScanColumns.COLUMNS;
    dateRangeSubscription: Subscription;

    constructor(private idScanService: IdScanService, private optionService: OptionService, private progressService: ProgressService) { }

    ngOnInit() {
        this.dateRangeSubscription = this.optionService.dateRangeSubject.subscribe(dateRange => {
            this.idScans = [];
            this.updateData(dateRange);
        });
    }

    ngOnDestroy(): void {
        this.dateRangeSubscription.unsubscribe();
    }

    updateData(dateRange: DateRange) {
        this.idScans = null;
        this.progressService.loading = true;
        this.progressService.progressMessage = 'Loading ID Scans...';
        this.idScanService.retrieve(dateRange.formatStartDate(), dateRange.formatStopDate())
            .subscribe((idScans) => {
                this.idScans = _.orderBy(idScans, ['eventTimestamp'], ['asc']);
                this.progressService.loading = false;
            }, error => {
                this.progressService.loading = false;
            });
    }
}
