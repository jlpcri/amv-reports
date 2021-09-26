import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import getPath from 'lodash-es/get';
import {TableDataSource} from './tableDataSource';
import {ProgressService} from '../progress-bar/shared/progress.service';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  //  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent<T> implements AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<T>;

    @Input() dataSource: TableDataSource<T>;

    constructor(public progressService: ProgressService) {}

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // Data source does not connect until sort/paginator exist
        this.table.dataSource = this.dataSource;
        setTimeout(() => {
            // fixes empty table displaying incorrectly
            // just needs to trigger after all initial lifecycle checks apparently
            this.table.renderRows();
        }, 1);
    }

    getTitle(row, column) {
        return column.limit ? getPath(row, column.field) : '';
    }

    get loading() {
        if (this.progressService) {
            return this.progressService.loading;
        } else {
            return true;
        }
    }

}
