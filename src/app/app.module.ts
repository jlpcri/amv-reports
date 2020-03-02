import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SalesSummaryComponent } from "./sales/sales-summary/sales-summary.component";
import { GuestSummaryComponent } from './guests/guest-summary/guest-summary.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { StockSummaryComponent } from './inventory/stock-summary/stock-summary.component';
import { EcommSkuComponent } from './sales/ecomm-sku/ecomm-sku.component';
import {HttpClientModule} from "@angular/common/http";
import { PageableTableComponent } from './shared/pageable-table/pageable-table.component';
import { PagerComponent } from './shared/pager/pager.component';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SalesSummaryComponent,
    GuestSummaryComponent,
    SidemenuComponent,
    StockSummaryComponent,
    EcommSkuComponent,
    PageableTableComponent,
    PagerComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
