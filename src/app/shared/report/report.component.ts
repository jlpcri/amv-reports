import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import * as moment from 'moment';
import {ReportService} from './report.service';
import {ProgressService} from '../progress-bar/shared/progress.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormControl, FormGroup} from '@angular/forms';

const DATE_FORMATS = {
    parse: {
        dateInput: 'MM/DD/YYYY',
    },
    display: {
        dateInput: 'MM/DD/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    ],
})
export class ReportComponent implements OnInit, OnDestroy {
    @Input() title: string;
    @Input() reportService: ReportService<any>;

    range = new FormGroup({
        startDate: new FormControl(moment().startOf('month')),
        stopDate: new FormControl(moment().endOf('month'))
    });

    minDate = moment().subtract(5, 'years').startOf('year');
    maxDate = moment();

    displayedColumns$ = new Subject<string[]>();

    constructor(public progressService: ProgressService) {}

    ngOnInit() {
        this.displayedColumns$.subscribe({
            next: columns => {
                this.reportService.dataSource.displayedColumns$.next(columns);
            }
        });

        this.displayedColumns$.next(this.reportService.dataSource.columns.map(col => col.field));

        this.reportService.startDate$.next(moment().startOf('month'));
        this.reportService.stopDate$.next(moment().endOf('month'));
    }

    ngOnDestroy() {
        this.displayedColumns$.complete();
    }
}
