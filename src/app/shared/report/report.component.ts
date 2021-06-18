import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import * as moment from 'moment';
import {ReportService} from './report.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {
    @Input() title: string;
    @Input() reportService: ReportService<any>;

    displayedColumns$ = new Subject<string[]>();

    constructor() {}

    ngOnInit() {
        this.displayedColumns$.subscribe({
            next: columns => {
                this.reportService.dataSource.displayedColumns$.next(columns);
            }
        });

        this.displayedColumns$.next(this.reportService.dataSource.columns.map(col => col.field));

        this.reportService.date$.next(moment());
    }
}
