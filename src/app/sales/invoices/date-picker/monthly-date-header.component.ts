// tslint:disable:variable-name
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Moment } from 'moment';

@Component({
    selector: 'app-monthly-date-header',
    templateUrl: './monthly-date-header.component.html',
    styleUrls: ['./monthly-date-header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlyDateHeaderComponent implements OnDestroy {
    private destroyed$ = new Subject<void>();

    constructor(
        private calendar: MatCalendar<Moment>,
        private dateAdapter: DateAdapter<Moment>,
        @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
        cdr: ChangeDetectorRef
    ) {
        calendar.stateChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => cdr.markForCheck());
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    get yearLabel() {
        return this.dateAdapter
            .format(this.calendar.activeDate, 'YYYY')
            .toLocaleUpperCase();
    }

    get isPreviousValid() {
        return this.calendar.minDate.isBefore(this.prevDate.endOf('year'));
    }

    get isNextValid() {
        return this.calendar.maxDate.isAfter(this.nextDate.startOf('year'));
    }

    get nextDate() {
        return this.calendar.activeDate.clone().add(1, 'year');
    }

    get prevDate() {
        return this.calendar.activeDate.clone().subtract(1, 'year');
    }

    previousClicked() {
        const newDate = this.prevDate.isAfter(this.calendar.minDate)
            ? this.prevDate
            : this.calendar.minDate;
        this.calendar.yearSelected.emit(newDate);
        this.calendar.activeDate = newDate;
    }

    nextClicked() {
        const newDate = this.nextDate.isBefore(this.calendar.maxDate)
            ? this.nextDate
            : this.calendar.maxDate;
        this.calendar.yearSelected.emit(newDate);
        this.calendar.activeDate = newDate;
    }
}
