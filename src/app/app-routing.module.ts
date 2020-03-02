import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SalesSummaryComponent} from "./sales/sales-summary/sales-summary.component";
import {GuestSummaryComponent} from "./guests/guest-summary/guest-summary.component";
import {StockSummaryComponent} from "./inventory/stock-summary/stock-summary.component";
import {EcommSkuComponent} from "./sales/ecomm-sku/ecomm-sku.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'sales',
    pathMatch: 'full'
  },
  {
    path: 'sales',
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: SalesSummaryComponent },
      { path: 'invoices', component: SalesSummaryComponent },
      { path: 'ecomm-sku', component: EcommSkuComponent },
    ]
  },
  {
    path: 'guests',
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: GuestSummaryComponent },
      { path: 'profile', component: GuestSummaryComponent },
    ]
  },
  {
    path: 'inventory',
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: StockSummaryComponent },
      { path: 'warehouse', component: StockSummaryComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
