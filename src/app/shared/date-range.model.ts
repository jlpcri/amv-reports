import * as moment from 'moment'
import {Moment} from "moment";
import StartOf = moment.unitOfTime.StartOf;

export class DateRange {
    startDate: Moment;
    stopDate: Moment;
    units: StartOf;
    formatString: string = 'YYYY-MM-DD HH:mm:ss';
    constructor(units?: StartOf, startDate?: Moment, stopDate?: Moment) {
        this.units = units ? units : "month";
        this.startDate = startDate ? startDate : moment().startOf(this.units);
        this.stopDate = stopDate ? stopDate : moment(this.startDate).endOf(this.units);
    }
    get id() {
        return this.startDate.unix() + ':' + this.stopDate.unix();
    }
    previous() {
        let newStopDate = moment(this.startDate).startOf(this.units).subtract(1, "day");
        let newStartDate = moment(newStopDate).startOf(this.units);
        return new DateRange(this.units, newStartDate, moment(newStartDate).endOf(this.units));
    }
    next() {
        let newStartDate = moment(this.startDate).endOf(this.units).add(1, "day");
        let newStopDate = moment(newStartDate).endOf(this.units);
        return new DateRange(this.units, newStartDate, newStopDate);
    }
    formatStartDate() {
        return moment(this.startDate).utcOffset(0).format(this.formatString);
    }
    formatStopDate() {
        return moment(this.stopDate).utcOffset(0).format(this.formatString);
    }
    format() {
        if (this.units === 'months' || this.units === 'month') {
            let dt = this.startDate.format('MMM Do YYYY');
            if (this.startDate.isSame(this.stopDate, 'day')) {
                return dt;
            }
            return dt + ' - ' + this.stopDate.format('MMM Do YYYY');
        }
    }
}
