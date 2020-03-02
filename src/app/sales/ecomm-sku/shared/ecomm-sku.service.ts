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
                }
                resp = resp.filter(item => item.sku !== 'NCEXCISE');
                ecommSkus.next(resp)
            }
        );
        return ecommSkus;
    }
}
