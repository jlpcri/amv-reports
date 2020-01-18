import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SalesSummaryComponent } from "./sales/sales-summary/sales-summary.component";
import { GuestSummaryComponent } from './guests/guest-summary/guest-summary.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { StockSummaryComponent } from './inventory/stock-summary/stock-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SalesSummaryComponent,
    GuestSummaryComponent,
    SidemenuComponent,
    StockSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
