import { Injectable } from '@angular/core';
import {DateRange} from "./date-range.model";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class OptionService {

    private _selectedDateRange: DateRange = new DateRange();
    public dateRangeSubject: Subject<DateRange> = new Subject();

    constructor() {
    }

    get selectedDateRange(): DateRange {
        return this._selectedDateRange;
    }

    set selectedDateRange(dateRange: DateRange) {
        this._selectedDateRange = dateRange;
        this.dateRangeSubject.next(dateRange);
    }
}
