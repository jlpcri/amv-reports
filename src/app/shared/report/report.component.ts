import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import * as moment from 'moment';
import {ReportService} from './report.service';
import {ProgressService} from '../progress-bar/shared/progress.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit, OnDestroy {
    @Input() title: string;
    @Input() reportService: ReportService<any>;

    displayedColumns$ = new Subject<string[]>();

    constructor(public progressService: ProgressService) {}

    ngOnInit() {
        this.displayedColumns$.subscribe({
            next: columns => {
                this.reportService.dataSource.displayedColumns$.next(columns);
            }
        });

        this.displayedColumns$.next(this.reportService.dataSource.columns.map(col => col.field));

        this.reportService.date$.next(moment());
    }

    ngOnDestroy() {
        this.displayedColumns$.complete();
    }
}
