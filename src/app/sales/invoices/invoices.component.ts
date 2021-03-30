import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {InvoiceDataSource} from './invoices.datasource';
import {Invoice} from '../../shared/types/invoice';
import {Subject} from 'rxjs';
import {ProgressService} from '../../shared/progress-bar/shared/progress.service';
import {InvoiceService} from './invoice.service';
import getPath from 'lodash-es/get';
import * as moment from 'moment';

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class InvoicesComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<Invoice>;
    dataSource: InvoiceDataSource;

    invoices: Invoice[] = [];

    displayedColumns: string[];

    selectedStores: number[] = [];
    selectedStores$ = new Subject<number[]>();
    stores: any[] = [];

    getPath = getPath;

    constructor(private progressService: ProgressService, private invoiceService: InvoiceService) {}

    ngOnInit() {
        this.dataSource = new InvoiceDataSource();
        this.displayedColumns = this.dataSource.columns.map(col => col.field);
        this.invoiceService.invoices$.subscribe(
            invoices => {
                this.dataSource.data$.next(invoices);
            }, error => {
                console.error(error);
            });

        this.invoiceService.stores$.subscribe({
            next: stores => {
                this.stores = stores;
                this.selectedStores$.next(stores.map(store => store.id));
            }
        });

        this.selectedStores$.subscribe({
            next: stores => {
                this.selectedStores = stores;
                this.invoiceService.selectedStores$.next(stores);
            }
        });
        // reset date on component init to load fresh after app routing
        this.invoiceService.date$.next(moment());
        this.progressService.loading = true;
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }

    getTitle(row, column) {
        return column.limit ? getPath(row, column.field) : '';
    }
}
