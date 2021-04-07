import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, merge, Subject } from 'rxjs';
// import { COLUMNS, ColumnDef } from './invoices.columns';
import {ColumnDef} from '../../../shared/types/columnDef';
import * as moment from 'moment';
// import { Invoice } from '../../shared/types/invoice';
import getPath from 'lodash-es/get';
import {ExportToCsv} from 'export-to-csv';

export class TableDataSource<T> extends DataSource<T> {
    data: T[] = [];
    data$ = new Subject<T[]>();
    paginator: MatPaginator;
    sort: MatSort;

    columns: ColumnDef[];
    displayedColumns: string[];
    displayedColumns$ = new Subject<string[]>();
    title: string;

    constructor(columns: ColumnDef[], title: string = 'Data Table') {
        super();

        this.columns = columns;
        this.title = title;

        this.data$.subscribe({
            next: (data) => {
                this.data = data.map(row => {
                    // Flatten data
                    const newRow = {};
                    this.columns.forEach(col => {
                        newRow[col.field] = getPath(row, col.field, '');
                    });
                    return newRow as T;
                });
            }
        });
        this.displayedColumns$.subscribe({
            next: displayedColumns => {
                this.displayedColumns = displayedColumns;
            }
        });
    }

    format(data) {
        // Should format for display only; content changes should be made elsewhere.
        return data.map(row => {
            const newRow = {...row};
            this.columns.forEach(col => {
                if (col.type === 'date') {
                    newRow[col.field] = moment(row[col.field]).format('YYYY-MM-DD');
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

    // placeholder for anything that may need cleaned up on destroy
    disconnect() {}

    // Client-side pagination only
    getPagedData(data: T[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return this.format(data).splice(startIndex, this.paginator.pageSize);
    }
}
