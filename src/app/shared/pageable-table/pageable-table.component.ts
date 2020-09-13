import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PageableTableColumn} from './shared/pageable-table-column.model';
import {ExportToCsv} from 'export-to-csv';
import * as _ from 'lodash';
import {ProgressService} from '../progress-bar/shared/progress.service';

@Component({
  selector: 'pageable-table',
  templateUrl: './pageable-table.component.html',
  styleUrls: ['./pageable-table.component.css']
})
export class PageableTableComponent implements OnInit, AfterViewChecked {

    private allColumns: PageableTableColumn[];
    private allRows = [];
    private filteredRows = [];

    filterValue = '';
    visibleRows: any[];
    offset = 0;
    maxRows = 50;
    pages: number;
    firstPages;
    lastPages;
    selectedPage = 1;
    searchRows = _.debounce(this._searchRows, 250);

    @ViewChild('pageableContentDiv') pageableContentDiv: ElementRef;
    @ViewChild('pageableTbody') pageableTbody: ElementRef;

    @Input()
    tableName;

    constructor(private progressService: ProgressService) { }

    ngOnInit() {
    }

    ngAfterViewChecked() {
        const div = this.pageableContentDiv.nativeElement;
        div.style.top = div.offsetTop + 'px';
        div.style.right = '18px';
        div.style.bottom = '12px';
        div.style.left = div.offsetLeft + 'px';
        div.style.position = 'absolute';
    }

    @Input()
    set columns(columns: PageableTableColumn[]) {
        this.allColumns = columns;
    }

    get columns() {
        return this.allColumns;
    }

    @Input()
    set rows(rows: any[]) {
        this.allRows = rows;
        this.offset = 0;
        this.searchRows();
        this.changeMaxRows();
    }

    get rows() {
        return this.filteredRows;
    }

    setVisibleRows() {
        this.visibleRows = [];
        let max = +this.offset + +this.maxRows;
        if (this.filteredRows) {
            if (max > this.filteredRows.length) {
                max = this.filteredRows.length;
            }
            this.visibleRows = this.filteredRows.slice(this.offset, max);
        }
    }

    updatePages() {
        this.pages = Math.floor((this.filteredRows.length) / this.maxRows) + 2;
        this.firstPages = [1, 2, 3, 4, 5];
        this.lastPages = [];
        for (let i = this.pages - 5; i < this.pages; ++i) {
            this.lastPages.push(i);
        }
    }

    changeMaxRows() {
        if (this.filteredRows) {
            this.setVisibleRows();
            this.updatePages();
        } else {
            this.visibleRows = [];
        }
    }

    selectPage(page: number) {
        this.offset = (page - 1) * this.maxRows;
        this.selectedPage = page;
        this.setVisibleRows();
        this.updatePages();
    }

    nextPage() {
        if (this.selectedPage < this.pages - 1) {
            this.selectPage(this.selectedPage + 1);
        }
    }

    previousPage() {
        if (this.selectedPage > 1) {
            this.selectPage(this.selectedPage - 1);
        }
    }


    headerStyle(classes: string) {
        return classes.replace('fixed','');
    }

    exportCsv() {
        const csvRows = [];
        this.filteredRows.forEach(item => {
            const csvRow = {};
            this.allColumns.forEach( col => {
                csvRow[col.name] = item[col.name] ? item[col.name] : '';
            });
            csvRows.push(csvRow);
        });
        const exportToCsv = new ExportToCsv({
            filename: this.tableName,
            useKeysAsHeaders: true
        });
        exportToCsv.generateCsv(csvRows);
    }


    private sortValue(value: any): any {
        if (value === null || typeof value === 'undefined') {
            return '';
        } else {
            return value.toUpperCase();
        }
    }

    private sortRows(col: string, sortOrder: number): void {
        this.filteredRows.sort((a, b) => {
            const aVal = this.sortValue(a[col]);
            const bVal = this.sortValue(b[col]);
            if (sortOrder === 0) {
                return bVal.localeCompare(aVal);
            } else {
                return aVal.localeCompare(bVal);
            }
        });
        this.offset = 0;
        this.changeMaxRows();
    }

    sort(col: string): void {
        for (const column of this.columns) {
            if (column.name === col) {
                column.sortOrder = column.sortOrder ? 0 : 1;
                this.sortRows(col, column.sortOrder);
                continue;
            }
            column.sortOrder = null;
        }
    }

    private _searchRows() {
        if (!this.allRows) {
            return;
        }
        this.progressService.progressMessage = 'Filtering...';
        console.log(this.allRows.length);
        this.progressService.loading = true;
        const val = this.filterValue.toLowerCase();
        const result = [];
        for (const row of this.allRows) {
            for (const field of Object.keys(row)) {
                const content = ('' + row[field]).toLowerCase();
                if (content.search(val) !== -1) {
                    result.push(row);
                    break;
                }
            }
        }
        console.log('result rows: ' + result.length);
        this.filteredRows = result;
        this.progressService.loading = false;
        this.offset = 0;
        this.changeMaxRows();
    }


}
