import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {merge, Observable, Subject} from 'rxjs';
import {ColumnDef} from '../types/columnDef';
import * as moment from 'moment-timezone';
import getPath from 'lodash-es/get';
import {ExportToCsv} from 'export-to-csv';
import {Timezone} from '../types/timezone';
import {GlobalConstants} from '../global-constants';

export class TableDataSource<T> extends DataSource<T> {
    data: T[] = [];
    data$ = new Subject<T[] | undefined>();
    paginator: MatPaginator;
    sort: MatSort;

    columns: ColumnDef[];
    displayedColumns: string[];
    displayedColumns$ = new Subject<string[]>();
    title: string;
    totalRecords: number;

    selectedTimezones$ = new Subject<string>();
    selectedTimezone = '';
    timezones: Timezone[];

    constructor(columns: ColumnDef[], title: string = 'Data Table') {
        super();

        this.columns = columns;
        this.title = title;
        this.timezones = GlobalConstants.timezones;
        this.selectedTimezone = GlobalConstants.timezones[2].value;

        this.data$.subscribe({
            next: (data) => {
                if (data === undefined) {
                    this.data = [];
                    return;
                }
                const newData = data.map(row => {
                    // Flatten data
                    const newRow = {};
                    this.columns.forEach(col => {
                        newRow[col.field] = getPath(row, col.field, '');
                    });
                    return newRow as T;
                });
                this.data = [...this.data, ...newData];
            }
        });
        this.displayedColumns$.subscribe({
            next: displayedColumns => {
                this.displayedColumns = displayedColumns;
            }
        });
        this.selectedTimezones$.subscribe({
            next: selectedTimezone => {
                this.selectedTimezone = selectedTimezone;
            }
        });
    }

    format(data) {
        // Should format for display only; content changes should be made elsewhere.
        return data.map(row => {
            const newRow = {...row};
            this.columns.forEach(col => {
                if (col.type === 'date' && row[col.field]?.length > 0) {
                    newRow[col.field] = moment.tz(row[col.field], this.selectedTimezone).format('YYYY-MM-DD');
                } else if (col.type === 'money') {
                    newRow[col.field] = parseFloat(row[col.field] || 0).toFixed(2);
                }
            });
            return newRow;
        });
    }

    connect(): Observable<T[]> {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        // Paginator and sort don't do much now but leaving this here for when they do
        const dataMutations = [
            this.data$.asObservable(),
            this.paginator.page,
            this.sort.sortChange
        ];

        return merge(...dataMutations).pipe(map(() => {
            // When the data, paginator, or sorting changes, get fresh data
            return this.getPagedData([...this.data]);
        }));
    }

    export() {
        const exportRows = this.data.map(row => {
            const newRow = {};
            this.columns.forEach(col => {
                newRow[col.field] = getPath(row, col.field) ?? '';
            });
            return newRow;
        });
        const exportToCsv = new ExportToCsv({
            filename: this.title,
            useKeysAsHeaders: true
        });
        exportToCsv.generateCsv(exportRows);
    }

    disconnect() {
        this.data$.complete();
        this.displayedColumns$.complete();
    }

    // Client-side pagination.
    getPagedData(data: T[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return this.format(data).splice(startIndex, this.paginator.pageSize);
    }

    get length() {
        // Set explicitly for paged API results.
        return this.totalRecords || this.data.length;
    }
}
