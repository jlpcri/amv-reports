import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {EcommSku} from "./ecomm-sku.model";

@Injectable({
  providedIn: 'root'
})
export class EcommSkuService {

    private sizeRegex = /([\d]+)\s*ml/i;
    private strengthRegex = /([\d]+)\s*mg/i;
    private wcRegex = /^\D/;
    constructor(private http: HttpClient) { }

    getEcommSkus(startDate: string, stopDate: string): Observable<EcommSku[]> {
        let ecommSkus: Subject<EcommSku[]> = new Subject<EcommSku[]>();
        let options = {
            params: new HttpParams().set('startDate', startDate).set('stopDate', stopDate)
        };
        this.http.get<EcommSku[]>('/amv-reports/api/v1/sales/ecomm-sku', options).subscribe(
            resp => {
                for (let i=0; i < resp.length; ++i) {
                    let item = resp[i];

                    let sizeMatch = item.productName.match(this.sizeRegex);
                    if (sizeMatch && sizeMatch.length == 2)
                        item.size = +sizeMatch[1];

                    let strengthMatch = item.productName.match(this.strengthRegex);
                    if (strengthMatch && strengthMatch.length == 2)
                        item.strength = +strengthMatch[1];

                    // Must have both
                    if (!item.strength || !item.size) {
                        item.strength = null;
                        item.size = null;
                    }

                    if (item.orderDiscount) {
                        // WC items already have discount applied to the item price - undo that
                        if (item.invoiceId.match(this.wcRegex)) {
                            let itemPercent = item.price / (item.orderSubtotal - item.orderDiscount);
                            item.price = item.orderSubtotal * itemPercent;
                        }
                        item.discountPercent = item.price / item.orderSubtotal;
                        item.discount = item.orderDiscount * item.discountPercent;
                        item.discountPercent *= 100;
                    }
                }
                resp = resp.filter(item => item.sku !== 'NCEXCISE');
                ecommSkus.next(resp)
            }
        );
        return ecommSkus;
    }
}
