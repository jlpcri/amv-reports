import { Injectable } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {EcommSku} from './ecomm-sku.model';
import {Cogs} from './cogs.model';
import {ProgressService} from '../../../shared/progress-bar/shared/progress.service';
import {ReportsApiService} from '../../../shared/reports-api/reports-api.service';

@Injectable({
  providedIn: 'root'
})
export class EcommSkuService {

    private sizeRegex = /([\d]+)\s*ml/i;
    private strengthRegex = /([\d]+)\s*mg/i;
    constructor(private reportsApiService: ReportsApiService, private progressService: ProgressService) { }

    getEcommSkus(startDate: string, stopDate: string): Observable<EcommSku[]> {
        const ecommSkus: Subject<EcommSku[]> = new Subject<EcommSku[]>();
        const options = {
            params: new HttpParams().set('startDate', startDate).set('stopDate', stopDate)
        };

        this.progressService.progressMessage = 'Loading e-Commerce Sales...';
        this.progressService.loading = true;
        this.reportsApiService.get<EcommSku[]>('/sales/ecomm-sku', options).subscribe(
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

                    if (item.orderDiscount) {
                        item.discountPercent = item.price / item.orderSubtotal;
                        item.discount = item.orderDiscount * item.discountPercent;
                        item.discountPercent *= 100;
                        if (item.sourceType === 'prestashop') {
                            item.price += item.discount;
                        }
                    } else {
                        item.discountPercent = null;
                        item.discount = null;
                        item.orderDiscount = null;
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
                this.progressService.loading = false;
                ecommSkus.next(resp);
            }, error => {
                this.progressService.loading = false;
            }
        );
        return ecommSkus;
    }

    getWarehouseCogs(startDate: string, stopDate: string ): Observable<Cogs[]> {
        const cogsSubject: Subject<Cogs[]> = new Subject();
        const options = {
            params: new HttpParams().set('startDate', startDate).set('stopDate', stopDate)
        };

        this.progressService.progressMessage = 'Loading Warehouse COGS...';
        this.progressService.loading = true;
        this.reportsApiService.get<Cogs[]>('/warehouse-cogs', options).subscribe(
            resp => {
                cogsSubject.next(resp);
                this.progressService.loading = false;
            }, error => {
                this.progressService.loading = false;
            }
        );
        return cogsSubject;
    }
}
