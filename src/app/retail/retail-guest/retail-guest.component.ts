import { Component, OnInit } from '@angular/core';
import {RetailGuestService} from './shared/retail-guest.service';
import {PageableTableColumn} from '../../shared/pageable-table/shared/pageable-table-column.model';
import {RetailGuestColumns} from './shared/retail-guest-columns';
import {RetailGuest} from './shared/retail-guest.model';

@Component({
  selector: 'app-retail-guest',
  templateUrl: './retail-guest.component.html',
  styleUrls: ['./retail-guest.component.css']
})
export class RetailGuestComponent implements OnInit {

  retailGuestColumns: PageableTableColumn[] = RetailGuestColumns.COLUMNS;
  retailGuests: RetailGuest[] = [];

  constructor(private retailGuestService: RetailGuestService) { }

  ngOnInit(): void {
      this.updateData(false);
  }

  updateData(refresh: boolean): void {
      this.retailGuestService.retrieveAllGuests(refresh).subscribe(
          resp => {
              this.retailGuests = resp;
          }
      );
  }

}
