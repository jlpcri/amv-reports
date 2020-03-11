import { Component, OnInit } from '@angular/core';
import {EcommSkuService} from "./shared/ecomm-sku.service";
import {EcommSku} from "./shared/ecomm-sku.model";
import {ExportToCsv} from "export-to-csv";
import {Cogs} from "./shared/cogs.model";

@Component({
  selector: 'app-ecomm-sku',
  templateUrl: './ecomm-sku.component.html',
  styleUrls: ['./ecomm-sku.component.css']
})
export class EcommSkuComponent implements OnInit {

    ecommSkus: EcommSku[];
    warehouseCogs: Cogs[];
    skuStockHistory: { [sku: string]: Cogs[] } = {};

    constructor(private ecommSkuService: EcommSkuService) { }

    ngOnInit() {
        this.ecommSkuService.getEcommSkus('2020-02-01 05:00:00', '2020-03-01 05:00:00').subscribe(
            skus => this.ecommSkus = skus
        );
        this.ecommSkuService.getWarehouseCogs('2020-02-01 05:00:00', '2020-03-01 05:00:00').subscribe(
            cogs => {
                this.warehouseCogs = cogs;
                cogs.forEach(item => {
                    if (typeof this.skuStockHistory[item.sku] === 'undefined') {
                        this.skuStockHistory[item.sku] = [];
                    }
                    this.skuStockHistory[item.sku].push(item);
                });
                this.processCogs();
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
                size: item.size ? item.size : '',
                strength: item.strength ? item.strength : '',
                productGroup: item.productGroup ? item.productGroup : '',
                manufacturer: item.manufacturer ? item.manufacturer : '',
                customerGroup: item.customerGroup,
                billTo: item.billTo,
                shipTo: item.shipTo,
                street: item.shippingStreet,
                state: item.shippingRegion,
                zipCode: item.shippingZipCode
            });
        });
        const exportToCsv = new ExportToCsv({
            filename: 'ecommerce-sku-report',
            useKeysAsHeaders: true
        });
        exportToCsv.generateCsv(csvRows);
    }

    processCogs() {
        Object.keys(this.skuStockHistory).forEach(sku => {
            let skuHistory = this.skuStockHistory[sku];
            skuHistory.sort((a, b) => {
                if (a.stockDate < b.stockDate)
                    return -1;
                if (a.stockDate > b.stockDate)
                    return 1;
                return 0;
            });
            let balance = 0;
            for (let i=0; i < skuHistory.length; ++i) {
                let current = skuHistory[i];
                if ( current.orderType === 'PURCHASE_ORDER' || current.orderType === 'ADJUSTMENT') {
                    balance += current.quantity;
                    current.balance = balance;
                }
                if ( current.orderType === 'SALES_ORDER') {
                    balance -= current.quantity;
                    current.balance = balance;
                }
            }
        });
    }

    showStockHistory(item: Cogs) {
        console.log(this.skuStockHistory[item.sku]);
    }
}
