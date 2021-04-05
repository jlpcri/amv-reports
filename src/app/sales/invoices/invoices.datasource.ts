import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, merge, Subject } from 'rxjs';
import { COLUMNS, ColumnDef } from './invoices.columns';
import * as moment from 'moment';
import { Invoice } from '../../shared/types/invoice';
import getPath from 'lodash-es/get';
import {ExportToCsv} from 'export-to-csv';

export class InvoiceDataSource extends DataSource<Invoice> {
    data: Invoice[] = [];
    data$ = new Subject<Invoice[]>();
    paginator: MatPaginator;
    sort: MatSort;

    columns: ColumnDef[];

    constructor() {
        super();
        this.columns = COLUMNS;
        this.data$.subscribe({
            next: (data) => {
                this.data = this.format(data);
            }
        });
    }

    format(data) {
        // Should format for display only; content changes should be made elsewhere.
        return data.map(row => {
            this.columns.forEach(col => {
                if (col.type === 'date') {
                    row[col.field] = moment(row[col.field]).format('YYYY-MM-DD');
                } else if (col.type === 'money') {
                    row[col.field] = parseFloat(row[col.field] || 0).toFixed(2);
                }
            });
            return row;
        });
    }

    connect(): Observable<Invoice[]> {
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
                newRow[col.field] = getPath(row, col.field);
            });
            return newRow;
        });
        const exportToCsv = new ExportToCsv({
            filename: 'invoice-report',
            useKeysAsHeaders: true
        });
        exportToCsv.generateCsv(exportRows);
    }

    // placeholder for anything that may need cleaned up on destroy
    disconnect() {}

    // Client-side pagination only
    getPagedData(data: Invoice[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }
}
