import { Component, OnInit } from '@angular/core';
import {EcommSkuService} from "./shared/ecomm-sku.service";
import {EcommSku} from "./shared/ecomm-sku.model";
import {ExportToCsv} from "export-to-csv";

@Component({
  selector: 'app-ecomm-sku',
  templateUrl: './ecomm-sku.component.html',
  styleUrls: ['./ecomm-sku.component.css']
})
export class EcommSkuComponent implements OnInit {

    ecommSkus: EcommSku[];

    constructor(private ecommSkuService: EcommSkuService) { }

    ngOnInit() {
        this.ecommSkuService.getEcommSkus('2020-02-01 05:00:00', '2020-03-01 05:00:00').subscribe(
            skus => this.ecommSkus = skus
        )
    }

    exportCsv() {
        const exportToCsv = new ExportToCsv({
            useKeysAsHeaders: true,
            filename: 'ecommerce-sku-report'
        });
        exportToCsv.generateCsv(this.ecommSkus);
    }
}
