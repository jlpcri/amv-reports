import { Component, OnInit } from '@angular/core';
import {OptionService} from "../option.service";
import {DateRange} from "../date-range.model";
import {Moment} from "moment";
import * as moment from 'moment';
import {DatePickerMonth} from "./date-picker-month.model";

@Component({
  selector: 'app-old-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class OldDatePickerComponent implements OnInit {

    dateRanges: DateRange[] = [];
    showCustomPicker: boolean = false;
    weeks = new Array(6);
    days = new Array(7);
    anchorDate: Moment;
    startDate: Moment;
    stopDate: Moment;
    visibleMonths: DatePickerMonth[];

    constructor(public optionService: OptionService) { }

    ngOnInit() {
        let currentDateRange = new DateRange(this.optionService.selectedDateRange.units);
        this.startDate = moment(currentDateRange.startDate);
        this.stopDate = moment(currentDateRange.stopDate);

        for (let i=5; i >= 0; --i) {
            this.dateRanges[i] = currentDateRange;
            currentDateRange = currentDateRange.previous();
        }

        this.optionService.dateRangeSubject.subscribe(range => {
            this.updateVisibleMonths();
        })
    }

    shortName(dateRange: DateRange) {
        if (dateRange.units == "month") {
            return dateRange.startDate.format("MMM-YY")
        }
    }

    selectRange(dateRange: DateRange) {
        this.optionService.selectedDateRange = dateRange;
        this.startDate = moment(dateRange.startDate);
        this.stopDate = moment(dateRange.stopDate);
    }

    isSelected(dateRange: DateRange) {
        return this.optionService.selectedDateRange.id === dateRange.id
    }

    isCustomRange() {
        for (let i=0; i < this.dateRanges.length; ++i) {
            if (this.dateRanges[i].id === this.optionService.selectedDateRange.id)
                return false;
        }
        return true;
    }

    toggleCustomPicker() {
        if (!this.showCustomPicker) {
            this.updateVisibleMonths();
        }
        this.showCustomPicker = !this.showCustomPicker;
    }

    updateVisibleMonths() {
        let months: DatePickerMonth[]  = [];
        months[1] = new DatePickerMonth(moment(this.optionService.selectedDateRange.stopDate));
        months[2] = new DatePickerMonth(moment(months[1].month).endOf("month").add(1, "day"));
        months[0] = new DatePickerMonth(moment(months[1].month).subtract(1, "day"));
        this.visibleMonths = months;
    }

    chooseDate(date: Moment) {
        if (this.anchorDate) {
            this.anchorDate = null;
        } else {
            this.anchorDate = moment(date);
            this.startDate = moment(date);
            this.stopDate = null;
        }
    }

    applySelection() {
        this.optionService.selectedDateRange = new DateRange(this.optionService.selectedDateRange.units, this.startDate, this.stopDate);
        this.showCustomPicker = false;
    }

    isStartDate(month: DatePickerMonth, week: number, day: number): boolean {
        let moment = month.days[week][day];
        if (moment)
            return moment.isSame(this.startDate, 'day');
        return false;
    }

    isStopDate(month: DatePickerMonth, week: number, day: number): boolean {
        let moment = month.days[week][day];
        if (moment)
            return moment.isSame(this.stopDate, 'day');
            return false;
    }

    isBetween(month: DatePickerMonth, week: number, day: number): boolean {
        let moment = month.days[week][day];
        if (moment)
            return moment.isBetween(this.startDate, this.stopDate, 'day');
        return false;
    }

    moveRange(date: Moment) {
        if (!date)
            return;
        if (!this.anchorDate)
            return;
        if (date.isAfter(this.anchorDate)) {
            this.stopDate = moment(date).endOf("day");
            this.startDate = moment(this.anchorDate);
        } else {
            this.stopDate = moment(this.anchorDate);
            this.startDate = moment(date).endOf("day");
        }
    }

    previousMonth() {
        this.optionService.selectedDateRange = this.optionService.selectedDateRange.previous();
    }

    nextMonth() {
        this.optionService.selectedDateRange = this.optionService.selectedDateRange.next();
    }

    format() {
        let dateRange = new DateRange(this.optionService.selectedDateRange.units, this.startDate, this.stopDate)
        return dateRange.format();
    }
}
