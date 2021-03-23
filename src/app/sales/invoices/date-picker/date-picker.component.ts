import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MonthlyDateHeaderComponent } from './monthly-date-header.component';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { InvoiceService } from '../invoice.service';

// TODO: This should be made generic and refactored out to a shared component
//  once the other date picker is no longer necessary

export const DATE_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent implements OnInit {
    date = new FormControl(moment());
    maxDate: Moment;
    minDate: Moment;
    monthlyDateHeader = MonthlyDateHeaderComponent;

    constructor(private invoiceService: InvoiceService) { }

    ngOnInit(): void {
        // Prevent unexpected behavior from selecting future/far past dates
        this.maxDate = moment().endOf('month');
        this.minDate = moment().subtract(10, 'years');
    }

    yearHandler(dateInput: Moment) {
        const formValue = this.date.value;
        formValue.year(dateInput.year());
        formValue.month(dateInput.month());
        this.date.setValue(formValue);
        this.invoiceService.date$.next(dateInput);
    }

    monthHandler(dateInput: Moment, datepicker: MatDatepicker<any>) {
        const formValue = this.date.value;
        formValue.month(dateInput.month());
        this.date.setValue(formValue);
        this.invoiceService.date$.next(dateInput);
        datepicker.close();
    }
}