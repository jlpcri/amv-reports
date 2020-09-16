import {Component, Input, OnInit} from '@angular/core';
import {PageableTableColumn} from "./shared/pageable-table-column.model";
import {ExportToCsv} from "export-to-csv";

@Component({
  selector: 'pageable-table',
  templateUrl: './pageable-table.component.html',
  styleUrls: ['./pageable-table.component.css']
})
export class PageableTableComponent implements OnInit {

    private _columns: PageableTableColumn[];
    private _rows: any[];
    visibleRows: any[];
    offset:number = 0;
    maxRows:number = 50;
    pages:number;
    firstPages;
    lastPages;
    selectedPage = 1;

    @Input()
    tableName;

    constructor() { }

    ngOnInit() {
    }

    @Input()
    set columns(columns: PageableTableColumn[]) {
        this._columns = columns;
    }

    get columns() {
        return this._columns;
    }

    @Input()
    set rows(rows: any[]) {
        this._rows = rows;
        this.offset = 0;
        this.changeMaxRows();
    }

    setVisibleRows() {
        this.visibleRows = [];
        let max = +this.offset + +this.maxRows;
        if (max > this._rows.length)
            max = this._rows.length;
        this.visibleRows = this._rows.slice(this.offset, max);
    }

    updatePages() {
        this.pages = Math.floor((this._rows.length) / this.maxRows) + 2;
        this.firstPages = [1, 2, 3, 4, 5];
        this.lastPages = [];
        for (let i = this.pages - 5; i < this.pages; ++i) {
            this.lastPages.push(i);
        }
    }

    changeMaxRows() {
        if (this._rows) {
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
        if (this.selectedPage < this.pages - 1)
            this.selectPage(this.selectedPage + 1)
    }

    previousPage() {
        if (this.selectedPage > 1)
            this.selectPage(this.selectedPage - 1)
    }

    get rows() {
        return this._rows;
    }

    headerStyle(classes: string) {
        return classes.replace('fixed','');
    }

    exportCsv() {
        let csvRows = [];
        this._rows.forEach(item => {
            let csvRow = {};
            this._columns.forEach( col => {
                csvRow[col.name] = item[col.name] ? item[col.name] : "";
            });
            csvRows.push(csvRow);
        });
        const exportToCsv = new ExportToCsv({
            filename: this.tableName ? this.tableName : 'amv-report',
            useKeysAsHeaders: true
        });
        exportToCsv.generateCsv(csvRows);
    }
}
