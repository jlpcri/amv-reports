import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestSummaryComponent } from './guests/guest-summary/guest-summary.component';
import { StockHistoryComponent } from './inventory/stock-history/stock-history.component';
import { EcommSkuComponent } from './sales/ecomm-sku/ecomm-sku.component';
import { HttpClientModule } from '@angular/common/http';
import { PageableTableComponent } from './shared/pageable-table/pageable-table.component';
import { PagerComponent } from './shared/pager/pager.component';
import { OldDatePickerComponent } from './shared/old-date-picker/date-picker.component';
import { IdScansComponent } from './retail/id-scans/id-scans.component';
import {FormsModule} from '@angular/forms';
import { IdTransactionsComponent } from './retail/id-transactions/id-transactions.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { IconsModule } from './shared/icons/icons.module';
import { MessageModalComponent } from './shared/message-modal/message-modal.component';
import { AgeCategoriesComponent } from './retail/age-categories/age-categories.component';
import { SalesModule} from './sales/sales.module';
import {SidebarLayoutComponent} from './sidebar-layout/sidebar-layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {SharedModule} from './shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PurchaseOrdersComponent } from './retail/purchase-orders/purchase-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestSummaryComponent,
    StockHistoryComponent,
    EcommSkuComponent,
    PageableTableComponent,
    PagerComponent,
    OldDatePickerComponent,
    IdScansComponent,
    IdTransactionsComponent,
    ProgressBarComponent,
    MessageModalComponent,
    AgeCategoriesComponent,
    SidebarLayoutComponent,
    PurchaseOrdersComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        IconsModule,
        SalesModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        SharedModule,
        MatFormFieldModule,
        MatSelectModule,
        MatProgressBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
