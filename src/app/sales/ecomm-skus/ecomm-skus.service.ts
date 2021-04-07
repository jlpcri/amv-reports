import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ProgressService } from '../../shared/progress-bar/shared/progress.service';
import { Moment } from 'moment';
import { ReportsApiService} from '../../shared/reports-api/reports-api.service';
import { Region } from '../../shared/types/region';
import { Site } from '../../shared/types/site';
import { MatSnackBar } from '@angular/material/snack-bar';
import {EcommSku} from '../ecomm-sku/shared/ecomm-sku.model';
import {Cogs, StockCost} from '../ecomm-sku/shared/cogs.model';

@Injectable({
    providedIn: 'root'
})
export class EcommSkusService {
    date$ = new Subject<Moment>();
    skus$ = new Subject<EcommSku[]>();
    ecommSkus: EcommSku[];
    cogs$ = new Subject<Cogs[]>();
    cogs: Cogs[];
    regions$ = new Subject<Region[]>();
    selectedRegion$ = new Subject<string>();
    selectedRegion: string;
    startDate: string;
    stopDate: string;
    sites$ = new Subject<Site[]>();
    sites: Site[] = [];
    selectedSites$ = new Subject<number[]>();
    selectedSites: number[] = [];
    sizeRegex = /([\d]+)\s*ml/i;
    strengthRegex = /([\d]+)\s*mg/i;
    skuStockHistory: { [sku: string]: Cogs[] } = {};
    WC_ORDER = /^\D/;

    constructor(private reportsApiService: ReportsApiService, private progressService: ProgressService, private snackBar: MatSnackBar) {
        this.date$.subscribe({
            // currently reports are viewable by month but Material date picker selects a day
            next: date => {
                this.startDate = date.startOf('month').toISOString();
                this.stopDate = date.endOf('month').toISOString();
                this.getSites();
            }
        });
        this.selectedSites$.subscribe({
            // when selected sites are updated in form, refresh skus
            next: sites => {
                this.selectedSites = sites;
                this.getSkus();
            }
        });
        this.selectedRegion$.subscribe({
            next: region => {
                if (region === 'All') { region = undefined; }
                this.selectedRegion = region;
                this.getSkus();
            }
        });
        this.cogs$.subscribe({
            next: cogs => {
                this.cogs = cogs;
                cogs.forEach(item => {
                    if (typeof this.skuStockHistory[item.sku] === 'undefined') {
                        this.skuStockHistory[item.sku] = [];
                    }
                    this.skuStockHistory[item.sku].push(item);
                });
                this.processCogs();
                this.updateSkuCost();
            }
        })
    }

    getSites() {
        this.progressService.progressMessage = 'Loading Sites...';
        // gets a list of sites that have skus in the provided period
        const params = new HttpParams()
            .set('startDate', this.startDate)
            .set('stopDate', this.stopDate)
            .set('channel', 'ecomm');

        this.reportsApiService.get<Site[]>('/invoice-sites', {params}).subscribe(
            sites => {
                this.sites$.next(sites);
                this.progressService.loading = false;
            },
            error => {
                this.displayError('Error loading sites.');
                this.progressService.loading = false;
            }
        );
    }


    getWarehouseCogs() {
        let params = new HttpParams()
            .set('startDate', this.startDate)
            .set('stopDate', this.stopDate)
            .set('channel', 'ecomm')
            .set('sites', this.selectedSites.toString());

        if (this.selectedRegion) {
            params = params.set('region', this.selectedRegion);
        }

        this.progressService.progressMessage = 'Loading Warehouse COGS...';

        this.reportsApiService.get<Cogs[]>('/warehouse-cogs', {params}).subscribe(
            resp => {
                this.cogs$.next(resp);
                this.progressService.loading = false;
            }, error => {
                this.progressService.loading = false;
            }
        );
    }

    getSkus() {
        // actually gets the skus for the main invoice report
        this.progressService.progressMessage = 'Loading eCommerce SKUs...';
        this.progressService.loading = true;

        let params = new HttpParams()
            .set('startDate', this.startDate)
            .set('stopDate', this.stopDate)
            .set('channel', 'ecomm')
            .set('sites', this.selectedSites.toString());

        if (this.selectedRegion) {
            params = params.set('region', this.selectedRegion);
        }
        this.reportsApiService.get<EcommSku[]>('/sales/ecomm-sku', {params}).subscribe(
            resp => {
                for (const item of resp) {
                    const sizeMatch = item.bottleSize ? item.bottleSize.match(this.sizeRegex) : null;
                    if (sizeMatch && sizeMatch.length === 2) {
                        item.size = +sizeMatch[1];
                    }

                    const strengthMatch = item.nicStrength ? item.nicStrength.match(this.strengthRegex) : null;
                    if (strengthMatch && strengthMatch.length === 2) {
                        item.strength = +strengthMatch[1];
                    }

                    // Must have both
                    if (typeof item.strength === 'undefined' || typeof item.size === 'undefined' || item.productGroup === 'Botanicals') {
                        item.strength = null;
                        item.size = null;
                    }

                    if (item.sourceType === 'prestashop') {
                        item.price += item.discount;
                    }
                }

                resp = resp.filter(item => {
                    return (item.sku !== 'NCEXCISE' && (
                        item.status === 'completed' ||
                        item.status === 'processing' ||
                        item.status === 'Shipped' ||
                        item.status === 'Payment accepted' ||
                        item.status === 'complete' ||
                        item.status === 'fulfilled' || // shopify
                        item.status === 'partial'  || // shopify
                        item.status === null // shopify - why?
                    ));
                });
                this.skus$.next(resp);
                this.ecommSkus = resp;
                this.getWarehouseCogs();
            }, error => {
                this.progressService.loading = false;
            }
        );
    }

    getRegions() {
        // gets regions, currently just US states
        this.progressService.progressMessage = 'Loading Regions...';
        this.progressService.loading = true;

        this.reportsApiService.get<Region[]>('/regions', {}).subscribe(
            regions => {
                this.regions$.next(regions);
                this.progressService.loading = false;
            },
            error => {
                this.regions$.next([]);
                this.progressService.loading = false;
                this.displayError('Error loading regions.');
            }
        );
    }

    displayError(message: string) {
        this.snackBar.open(message, 'Dismiss', { duration: 15000 });
    }

    processCogs() {
        Object.keys(this.skuStockHistory).forEach(sku => {
            this.skuStockHistory[sku].sort((a, b) => {
                return this.getStockDate(a).localeCompare(this.getStockDate(b));
            });

            let balance = 0;
            let latestCost = 0;
            const stock: StockCost[] = [];

            for (const current of this.skuStockHistory[sku]) {
                // let current = skuHistory[i];
                if ( current.orderType === 'PURCHASE_ORDER') {
                    if (current.price === null) {
                        current.priceEach = latestCost;
                        current.price = latestCost * current.quantity;
                    }
                    latestCost = current.price / current.quantity;
                    current.cost = latestCost;
                    balance += current.quantity;
                    current.balance = balance;
                    stock.push({quantity: current.quantity, cost: current.cost});
                }
                if ( current.orderType === 'ADJUSTMENT') {
                    balance += current.quantity;
                    current.balance = balance;
                    if (current.quantity > 0) {
                        stock.push({quantity: current.quantity, cost: latestCost});
                    } else {
                        this.removeStock(stock, current.quantity, latestCost);
                    }
                }
                if ( current.orderType === 'SALES_ORDER') {
                    current.cost = this.removeStock(stock, current.quantity, latestCost);
                    balance -= current.quantity;
                    current.balance = balance;
                }

                current.averageCost = this.calcAverage(stock, latestCost);
            }
        });
    }

    // remove stock and return average cost of items removed
    removeStock(stock: StockCost[], quantity: number, latestCost: number): number {
        let remaining = quantity;
        let removed = 0;
        let totalCost = 0;

        while (stock.length && stock[0].quantity === 0) {
            stock.shift();
        }

        for (const stockEvent of stock) {
            if (remaining <= stockEvent.quantity) {
                stockEvent.quantity -= remaining;
                totalCost += (remaining * stockEvent.cost);
                removed += remaining;
                return totalCost / removed;
            }
            removed += stockEvent.quantity;
            totalCost += (stockEvent.quantity * stockEvent.cost);
            remaining -= stockEvent.quantity;
            stockEvent.quantity = 0;
        }

        if (remaining > 0) {
            removed += remaining;
            totalCost += (remaining * latestCost);
            return totalCost / removed;
        }
    }

    calcAverage(list: StockCost[], latestCost: number): number {
        if (list.length === 0) { return 0; }
        let n = 0;
        let tot = 0;
        list.forEach(stock => {
            n += stock.quantity;
            tot += (stock.quantity * stock.cost);
        });

        return tot / n;
    }

    updateSkuCost() {
        this.ecommSkus.forEach(item => {
            if (!this.skuStockHistory[item.sku]) { return; }
            const stockHistory = this.skuStockHistory[item.sku];
            let event;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < stockHistory.length; i++) {
                event = stockHistory[i];
                if (item.invoiceId.match(this.WC_ORDER)) {
                    if (event.invoiceId === item.invoiceId || +event.invoiceId === +item.sourceId) {
                        item.cost = event.cost * event.quantity;
                        break;
                    }
                }
            }
            if (!item.cost) {
                item.cost = item.quantity * event.averageCost;
            }
        });

        this.skus$.next(this.ecommSkus);
    }

    getStockDate(cogs: Cogs): string {
        return cogs.packDate || cogs.shipDate || cogs.createdAt;
    }

}
