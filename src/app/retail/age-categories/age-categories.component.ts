import {Component, OnDestroy, OnInit} from '@angular/core';
import {AgeCategoriesService} from "./shared/age-categories.service";
import {OptionService} from "../../shared/option.service";
import {DateRange} from "../../shared/date-range.model";
import {GuestAges} from "./shared/guest-ages.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-age-categories',
  templateUrl: './age-categories.component.html',
  styleUrls: ['./age-categories.component.css']
})
export class AgeCategoriesComponent implements OnInit, OnDestroy {

    private ages = '-20,-24,25-,21-24,25-34,35-44,45-54,55-64,65-';
    guestAges: GuestAges = null;
    dateRangeSubscription: Subscription;

    constructor(private optionService: OptionService, private ageCategoriesService: AgeCategoriesService) { }

    ngOnInit() {
        this.dateRangeSubscription = this.optionService.dateRangeSubject.subscribe(dateRange => {
            this.guestAges = null;
            this.updateData(dateRange);
        });
    }

    ngOnDestroy(): void {
        this.dateRangeSubscription.unsubscribe();
    }

    updateData(dateRange: DateRange) {
        this.ageCategoriesService.retrieve(dateRange.formatStartDate(), dateRange.formatStopDate(), this.ages).subscribe(
            guestAges => {
                this.guestAges = guestAges;
            }
        );
    }

}
