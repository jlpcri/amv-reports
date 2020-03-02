import { Component, OnInit } from '@angular/core';
import {PageableTableColumn} from "./shared/pageable-table-column.model";

@Component({
  selector: 'app-pageable-table',
  templateUrl: './pageable-table.component.html',
  styleUrls: ['./pageable-table.component.css']
})
export class PageableTableComponent implements OnInit {

    columns: PageableTableColumn[];
    constructor() { }

    ngOnInit() {
    }

}
