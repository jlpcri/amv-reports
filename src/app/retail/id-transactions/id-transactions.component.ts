import {Component, OnDestroy, OnInit} from '@angular/core';
import {IdScan} from '../id-scans/shared/id-scan.model';
import {PageableTableColumn} from '../../shared/pageable-table/shared/pageable-table-column.model';
import {Subscription} from 'rxjs';
import {IdScanService} from '../id-scans/shared/id-scan.service';
import {OptionService} from '../../shared/option.service';
import {DateRange} from '../../shared/date-range.model';
import {Invoice} from '../../shared/types/invoice';
import {IdTransaction} from './shared/id-transaction.model';
import {IdTransactionColumns} from './shared/id-transaction-columns';
import {ProgressService} from '../../shared/progress-bar/shared/progress.service';

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
    allTransactions: IdTransaction[];
    transactionColumns: PageableTableColumn[] = IdTransactionColumns.COLUMNS;
    dateRangeSubscription: Subscription;
    showAllScans: boolean = false;
    onlyMinors: boolean = false;
    onlyUnknown: boolean = false;
    missingScans: boolean = false;

    constructor(
        private idScanService: IdScanService,
        private optionService: OptionService,
        private progressService: ProgressService
    ) { }

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
        this.progressService.loading = true;
        this.loading = true;
        this.progressService.progressMessage = 'Loading ID Scans...';
        this.idScanService.retrieve(dateRange.formatStartDate(), dateRange.formatStopDate()).subscribe(
            (idScans) => {
                this.idScans = idScans;
                this.idScanService.retrieveInvoices(dateRange.formatStartDate(), dateRange.formatStopDate()).subscribe(
                    invoices => {
                        this.invoices = invoices;
                        console.log('found ' + invoices.length + ' invoices');
                        this.loading = false;
                        this.allTransactions = this.processIdScans();
                        this.filterIdTransactions();
                        this.loading = false;
                    }, error => {
                        this.loading = false;
                    });
            }, error => {
                this.progressService.loading = false;
                this.loading = false;
            });
    }

    filterIdTransactions() {
        this.transactions = [];
        const result = [];
        this.allTransactions.forEach(idTransaction => {
            if (!this.showAllScans && !idTransaction.invoice) {
                return;
            }
            if (this.missingScans) {
                if (idTransaction.invoice && idTransaction.idScan)
                    return;
            }
            if (this.onlyMinors) {
                if (idTransaction.result !== 'minor') {
                    return;
                }
            }
            if (this.onlyUnknown) {
                if (idTransaction.idScan) {
                    if (idTransaction.idScan.result !== 'bypass' && idTransaction.idScan.result !== 'error') {
                        return;
                    }
                }
            }
            result.push(idTransaction)
        });
        this.transactions = result;
    }

    processIdScans() {
        const registers = {};
        const idTransactions = [];
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
        for (const registerName of Object.keys(registers)) {
            const registerEvents = registers[registerName];
            registerEvents.sort((a, b) => {
                let ts1: string;
                let ts2: string;
                ts1 = typeof a.eventTimestamp === 'undefined' ? a.paymentDate : a.eventTimestamp;
                ts2 = typeof b.eventTimestamp === 'undefined' ? b.paymentDate : b.eventTimestamp;
                if (ts1 < ts2)
                    return -1;
                if (ts1 > ts2)
                    return 1;
                return 0;
            });

            let idScan;
            registerEvents.forEach(event => {
                const idTransaction = new IdTransaction();
                if (typeof event.eventTimestamp !== 'undefined') {
                    idScan = event;
                    idTransaction.idScan = event;
                } else {
                    idTransaction.invoice = event;
                    idTransaction.idScan = idScan;
                    idScan = undefined;
                }
                idTransactions.push(idTransaction);
            });
        }

        return idTransactions;
    }
}
