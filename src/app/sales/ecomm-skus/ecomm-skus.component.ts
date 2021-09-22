import { Component, OnInit } from '@angular/core';
import {TableDataSource} from '../../shared/data-table/tableDataSource';
import {COLUMNS} from './ecomm-skus.columns';
import {EcommSku} from '../ecomm-sku/shared/ecomm-sku.model';
import {ProgressService} from '../../shared/progress-bar/shared/progress.service';
import {EcommSkusService} from './ecomm-skus.service';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ecomm-skus',
  templateUrl: './ecomm-skus.component.html',
  styleUrls: ['./ecomm-skus.component.css']
})
export class EcommSkusComponent implements OnInit {
    dataSource: TableDataSource<EcommSku>;

    skus: EcommSku[] = [];

    displayedColumns$ = new Subject<string[]>();

    selectedSites: number[] = [];
    selectedSites$ = new Subject<number[]>();
    sites: any[] = [];

    selectedRegion = 'All';
    selectedRegion$ = new Subject<string>();
    regions: any[] = [];

    range = new FormGroup({
        startDate: new FormControl(moment().startOf('month')),
        stopDate: new FormControl(moment().endOf('month'))
    });

    minDate = moment().subtract(5, 'years').startOf('year');
    maxDate = moment();


    constructor(private progressService: ProgressService, public ecommSkusService: EcommSkusService) { }

  ngOnInit(): void {
      this.dataSource = new TableDataSource<EcommSku>(COLUMNS, 'Ecomms-SKU Report');


      this.displayedColumns$.subscribe({
          next: columns => {
              this.dataSource.displayedColumns$.next(columns);
          }
      });

      this.displayedColumns$.next(this.dataSource.columns.map(col => col.field));

      this.ecommSkusService.skus$.subscribe({
          next: invoices => {
              this.dataSource.data$.next(invoices);
          }
      });

      this.ecommSkusService.sites$.subscribe({
          next: sites => {
              this.sites = sites;
              this.selectedSites$.next([]);
        }
      });

      this.selectedSites$.subscribe({
          next: sites => {
              this.selectedSites = sites;
              this.ecommSkusService.selectedSites$.next(sites);
          }
      });

      this.ecommSkusService.regions$.subscribe({
          next: regions => {
              this.regions = regions;
              this.selectedRegion$.next('All');
          }
      });

      this.selectedRegion$.subscribe({
          next: region => {
              this.selectedRegion = region;
              this.ecommSkusService.selectedRegion$.next(region);
          }
      });

      // reset date on component init to load fresh after app routing
      this.ecommSkusService.startDate$.next(moment().startOf('month'));
      this.ecommSkusService.stopDate$.next(moment().endOf('month'));

      this.ecommSkusService.getRegions();

      this.progressService.loading = true;
  }

}
