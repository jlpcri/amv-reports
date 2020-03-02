import { Component, OnInit } from '@angular/core';
import {EcommSkuService} from "./shared/ecomm-sku.service";
import {EcommSku} from "./shared/ecomm-sku.model";

@Component({
  selector: 'app-ecomm-sku',
  templateUrl: './ecomm-sku.component.html',
  styleUrls: ['./ecomm-sku.component.css']
})
export class EcommSkuComponent implements OnInit {

    ecommSkus: EcommSku[];

    constructor(private ecommSkuService: EcommSkuService) { }

    ngOnInit() {
        this.ecommSkuService.getEcommSkus('2020-02-01', '2020-02-29').subscribe(
            skus => this.ecommSkus = skus
        )
    }
}
