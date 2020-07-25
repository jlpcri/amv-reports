import {Component, OnDestroy, OnInit} from '@angular/core';
import {IdScan} from "../id-scans/shared/id-scan.model";
import {PageableTableColumn} from "../../shared/pageable-table/shared/pageable-table-column.model";
import {Subscription} from "rxjs";
import {IdScanService} from "../id-scans/shared/id-scan.service";
import {OptionService} from "../../shared/option.service";
import {DateRange} from "../../shared/date-range.model";
import {InvoiceService} from "../../sales/invoices/shared/invoice.service";
import {Invoice} from "../../sales/invoices/shared/invoice.model";
import {IdTransaction} from "./shared/id-transaction.model";
import {IdTransactionColumns} from "./shared/id-transaction-columns";

@Component({
  selector: 'app-id-transactions',
  templateUrl: './id-transactions.component.html',
  styleUrls: ['./id-transactions.component.css']
})

export class IdTransactionsComponent implements OnInit,OnDestroy {

    loading: boolean = false;
    idScans: IdScan[];
    invoices: Invoice[];
    transactions: IdTransaction[];
    transactionColumns: PageableTableColumn[] = IdTransactionColumns.COLUMNS;
    dateRangeSubscription: Subscription;

    constructor(private idScanService: IdScanService, private optionService: OptionService, private invoiceService: InvoiceService) { }

    ngOnInit() {
        this.dateRangeSubscription = this.optionService.dateRangeSubject.subscribe(dateRange => {
            this.idScans = [];
            this.updateData(dateRange);
        });
    }

    ngOnDestroy(): void {
        this.dateRangeSubscription.unsubscribe();
    }

    updateData(dateRange: DateRange) {
        this.idScans = null;
        this.invoices = null;
        this.loading = true;
        this.idScanService.getIdScans(dateRange.formatStartDate(), dateRange.formatStopDate()).subscribe(
            idScans => {
                this.idScans = idScans;
                this.invoiceService.getInvoicesByChannel(dateRange.formatStartDate(), dateRange.formatStopDate(), 'retail').subscribe(
                    invoices => {
                        this.invoices = invoices;
                        this.loading = false;
                        this.processIdScans()
                    }
                )
            }
        );
    }

    processIdScans() {
        let registers = {};
        this.idScans.forEach( scan => {
            if (!registers[scan.register]) {
                registers[scan.register] = [];
            }
            registers[scan.register].push(scan);
        });
        this.invoices.forEach( invoice => {
            if (!registers[invoice.register]) {
                registers[invoice.register] = [];
            }
            registers[invoice.register].push(invoice);
        });

        this.transactions = [];
        for (let registerName of Object.keys(registers)) {
            let registerEvents = registers[registerName];
            registerEvents.sort((a, b) => {
                let ts1: string;
                let ts2: string;
                ts1 = typeof a.eventTimestamp === "undefined" ? a.paymentDate : a.eventTimestamp;
                ts2 = typeof b.eventTimestamp === "undefined" ? b.paymentDate : b.eventTimestamp;
                if (ts1 < ts2)
                    return -1;
                if (ts1 > ts2)
                    return 1;
                return 0;
            });

            let idScan;
            registerEvents.forEach(event => {
                let idTransaction = new IdTransaction();
                if (typeof event.eventTimestamp !== 'undefined') {
                    idScan = event;
                    idTransaction.idScan = event;
                } else {
                    idTransaction.invoice = event;
                    idTransaction.idScan = idScan;
                }
                this.transactions.push(idTransaction);
            });
        }
    }
}
