import { Component, OnInit } from '@angular/core';
import {EcommSkuService} from "./shared/ecomm-sku.service";
import {EcommSku} from "./shared/ecomm-sku.model";
import {ExportToCsv} from "export-to-csv";
import {Cogs, StockCost} from "./shared/cogs.model";
import {OptionService} from "../../shared/option.service";
import {DateRange} from "../../shared/date-range.model";

@Component({
  selector: 'app-ecomm-sku',
  templateUrl: './ecomm-sku.component.html',
  styleUrls: ['./ecomm-sku.component.css']
})
export class EcommSkuComponent implements OnInit {

    ecommSkus: EcommSku[] = [];
    warehouseCogs: Cogs[] = [];
    skuStockHistory: { [sku: string]: Cogs[] } = {};
    WC_ORDER = /^\D/;

    constructor(private ecommSkuService: EcommSkuService, private optionService: OptionService) { }

    ngOnInit() {
        this.optionService.dateRangeSubject.subscribe(dateRange => {
            this.updateData(dateRange);
        });
    }

    updateData(dateRange: DateRange) {
        this.ecommSkus = null;
        this.warehouseCogs = null;
        this.ecommSkuService.getEcommSkus(dateRange.formatStartDate(), dateRange.formatStopDate()).subscribe(
            skus => {
                this.ecommSkus = skus;
                this.ecommSkuService.getWarehouseCogs(dateRange.formatStartDate(), dateRange.formatStopDate()).subscribe(
                    cogs => {
                        this.warehouseCogs = cogs;
                        cogs.forEach(item => {
                            if (typeof this.skuStockHistory[item.sku] === 'undefined') {
                                this.skuStockHistory[item.sku] = [];
                            }
                            this.skuStockHistory[item.sku].push(item);
                        });
                        this.processCogs();
                        this.updateSkuCost();
                    }
                );
            }
        );
    }

    exportCsv() {
        let csvRows = [];
        this.ecommSkus.forEach(item => {
            csvRows.push({
                orderDate: item.createdAt,
                amvId: item.id,
                source: item.source,
                orderId: item.sourceId,
                invoiceId: item.invoiceId,
                status: item.status,
                sku: item.sku,
                product: item.productName,
                quantity: item.quantity,
                price: item.price,
                cost: item.cost ? item.cost : '',
                orderSubtotal: item.orderSubtotal,
                discount: item.discount ? item.discount : '',
                discountPercent: item.discountPercent ? item.discountPercent : '',
                couponCode: item.couponCode ? item.couponCode : '',
                size: item.size !== null ? item.size : '',
                strength: item.strength !== null ? item.strength : '',
                productGroup: item.productGroup ? item.productGroup : '',
                manufacturer: item.manufacturer ? item.manufacturer : '',
                customerGroup: item.customerGroup,
                billTo: item.billTo,
                shipTo: item.shipTo,
                street: item.shippingStreet,
                state: item.shippingRegion,
                zipCode: item.shippingZipCode,
                licenseReceived: item.licenseReceived,
                licenseDate: item.licenseDate
            });
        });
        const exportToCsv = new ExportToCsv({
            filename: 'ecommerce-sku-report',
            useKeysAsHeaders: true
        });
        exportToCsv.generateCsv(csvRows);
    }

    getStockDate(cogs: Cogs): string {
        if (cogs.packDate)
            return cogs.packDate;
        if (cogs.shipDate)
            return cogs.shipDate;
        return cogs.createdAt;
    }

    processCogs() {
        Object.keys(this.skuStockHistory).forEach(sku => {
            this.skuStockHistory[sku].sort((a, b) => {
                return this.getStockDate(a).localeCompare(this.getStockDate(b));
            });
            let skuHistory = this.skuStockHistory[sku];
            let balance = 0;
            let latestCost = 0;
            let stock: StockCost[] = [];

            for (let i=0; i < skuHistory.length; ++i) {
                let current = skuHistory[i];
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
    private removeStock(stock: StockCost[], quantity: number, latestCost: number): number {
        let remaining = quantity;
        let removed = 0;
        let totalCost = 0;

        while (stock.length && stock[0].quantity === 0) {
            stock.shift();
        }

        for (let i=0; i < stock.length; ++i) {
            if (remaining <= stock[i].quantity) {
                stock[i].quantity -= remaining;
                totalCost += (remaining * stock[i].cost);
                removed += remaining;
                return totalCost / removed;
            }
            removed += stock[i].quantity;
            totalCost += (stock[i].quantity * stock[i].cost);
            remaining -= stock[i].quantity;
            stock[i].quantity = 0;
        }

        if (remaining > 0) {
            removed += remaining;
            totalCost += (remaining * latestCost);
            return totalCost / removed;
        }
    }

    private calcAverage(list: StockCost[], latestCost: number): number {
        if (list.length === 0)
            return 0;
        let n = 0;
        let tot = 0;
        list.forEach(stock => {
            n += stock.quantity;
            tot += (stock.quantity * stock.cost);
        });
        if (n === 0)
            return latestCost;
        return tot / n;
    }

    showStockHistory(item: Cogs) {
        console.log(this.skuStockHistory[item.sku]);
    }

    updateSkuCost() {
        this.ecommSkus.forEach(item => {
            if (!this.skuStockHistory[item.sku])
                return;
            let stockHistory = this.skuStockHistory[item.sku];
            let event;
            for (let i = 0; i < stockHistory.length; ++i) {
                event = stockHistory[i];
                if (item.invoiceId.match(this.WC_ORDER)) {
                    if (event.invoiceId === item.invoiceId) {
                        item.cost = event.cost * event.quantity;
                        break;
                    }
                } else {
                    if (+event.invoiceId === +item.sourceId) {
                        item.cost = event.cost * event.quantity;
                        break
                    }
                }
            }
            if (!item.cost) {
                item.cost = item.quantity * event.averageCost;
            }
        });
    }
}
