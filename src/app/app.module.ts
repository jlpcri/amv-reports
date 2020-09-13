import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SalesSummaryComponent } from './sales/sales-summary/sales-summary.component';
import { GuestSummaryComponent } from './guests/guest-summary/guest-summary.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { StockSummaryComponent } from './inventory/stock-summary/stock-summary.component';
import { EcommSkuComponent } from './sales/ecomm-sku/ecomm-sku.component';
import {HttpClientModule} from '@angular/common/http';
import { PageableTableComponent } from './shared/pageable-table/pageable-table.component';
import { PagerComponent } from './shared/pager/pager.component';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';
import { IdScansComponent } from './retail/id-scans/id-scans.component';
import {FormsModule} from '@angular/forms';
import { IdTransactionsComponent } from './retail/id-transactions/id-transactions.component';
import { InvoicesComponent } from './sales/invoices/invoices.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import {IconsModule} from './shared/icons/icons.module';
import { MessageModalComponent } from './shared/message-modal/message-modal.component';
import { AgeCategoriesComponent } from './retail/age-categories/age-categories.component';

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
    DatePickerComponent,
    IdScansComponent,
    IdTransactionsComponent,
    InvoicesComponent,
    ProgressBarComponent,
    MessageModalComponent,
    AgeCategoriesComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        IconsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
