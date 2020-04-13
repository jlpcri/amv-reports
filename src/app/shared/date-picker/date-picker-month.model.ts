import {Moment} from "moment";
import * as moment from "moment";

export class DatePickerMonth {
    constructor(month: Moment) {
        this.month = moment(month).startOf("month");
        this.firstDay = this.month.weekday();
        this.lastDay = moment(month).endOf("month").date() + this.firstDay;

        for (let w = 0; w < 6; ++w) {
            if (!this.days[w])
                this.days[w] = [];
            for (let d = 0; d < 7; ++d) {
                let day = w * 7 + d;
                if (day < this.firstDay || day >= this.lastDay) {
                    continue;
                }
                this.days[w][d] = moment(month).date(day - this.firstDay + 1);
            }
        }
    }

    month: Moment;
    firstDay: number;
    lastDay: number;
    days: Moment[][] = [];

    date(w, d): number | string {
        if (this.days[w][d]) {
            return this.days[w][d].date();
        }
        return '&nbsp;';
    }

}
