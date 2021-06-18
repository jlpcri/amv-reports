import { Component, OnInit } from '@angular/core';
import {TableDataSource} from '../../shared/data-table/tableDataSource';
import {ShippedItem} from '../../shared/types/shippedItem';
import {Subject} from 'rxjs';
import {ProgressService} from '../../shared/progress-bar/shared/progress.service';
import {ShippedService} from './shipped.service';
import {COLUMNS} from './shipped.columns';
import * as moment from 'moment';

@Component({
  selector: 'app-shipped',
  templateUrl: './shipped.component.html',
  styleUrls: ['./shipped.component.css']
})
export class ShippedComponent implements OnInit {
    dataSource: TableDataSource<ShippedItem>;

    displayedColumns$ = new Subject<string[]>();

    selectedSite: number;
    selectedSite$ = new Subject<number>();
    sites: any[] = [];

    selectedRegion: string;
    selectedRegion$ = new Subject<string>();
    regions: any[] = [];

    constructor(private progressService: ProgressService, public shippedService: ShippedService) {}

    ngOnInit() {
        this.dataSource = new TableDataSource<ShippedItem>(COLUMNS, 'Shipped Item Report');

        this.displayedColumns$.subscribe({
            next: columns => {
                this.dataSource.displayedColumns$.next(columns);
            }
        });

        this.displayedColumns$.next(this.dataSource.columns.map(col => col.field));

        this.shippedService.shippedItems$.subscribe({
            next: shippedItems => {
                this.dataSource.data$.next([...this.dataSource.data, ...shippedItems]);
            }
        });

        this.progressService.cancel$.subscribe(() => {
            this.dataSource.data$.next([]);
        })

        this.shippedService.sites$.subscribe({
            next: sites => {
                this.sites = sites;
                this.selectedSite$.next(null);
            }
        });

        this.selectedSite$.subscribe({
            next: site => {
                this.selectedSite = site;
                this.shippedService.selectedSite$.next(site);
            }
        });

        this.shippedService.regions$.subscribe({
            next: regions => {
                this.regions = regions;
                this.selectedRegion$.next('All');
            }
        });

        this.selectedRegion$.subscribe({
            next: region => {
                this.selectedRegion = region;
                this.shippedService.selectedRegion$.next(region);
            }
        });

        // reset date on component init to load fresh after app routing
        this.shippedService.date$.next(moment());

        this.shippedService.getRegions();
        this.progressService.loading = true;

    }
}
