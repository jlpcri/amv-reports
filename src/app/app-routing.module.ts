import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuestSummaryComponent} from './guests/guest-summary/guest-summary.component';
import {StockHistoryComponent} from './inventory/stock-history/stock-history.component';
import {EcommSkuComponent} from './sales/ecomm-sku/ecomm-sku.component';
import {IdScansComponent} from './retail/id-scans/id-scans.component';
import {IdTransactionsComponent} from './retail/id-transactions/id-transactions.component';
import {AgeCategoriesComponent} from './retail/age-categories/age-categories.component';
import {InvoicesComponent} from './sales/invoices/invoices.component';
import {EcommSkusComponent} from './sales/ecomm-skus/ecomm-skus.component';
import {ShippedComponent} from './sales/shipped/shipped.component';
import {AuthGuard} from './auth.guard';
import {SidebarLayoutComponent} from './sidebar-layout/sidebar-layout.component';
import {CustomerSkuComponent} from './sales/customer-sku/customer-sku.component';
import {PurchaseOrdersComponent} from './retail/purchase-orders/purchase-orders.component';
import {ValuationReportComponent} from './inventory/valuation-report/valuation-report.component';
import {RetailGuestComponent} from './retail/retail-guest/retail-guest.component';

const routes: Routes = [
    {
        path: '',
        component: SidebarLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'sales',
                pathMatch: 'full'
            },
            {
                path: 'sales',
                children: [
                    { path: '', redirectTo: 'invoices', pathMatch: 'full' },
                    { path: 'invoices', component: InvoicesComponent },
                    { path: 'shipped-items', component: ShippedComponent},
                    { path: 'new-ecomm-sku', component: EcommSkusComponent },
                    { path: 'ecomm-sku', component: EcommSkuComponent },
                    { path: 'customer-sku', component: CustomerSkuComponent },
                ]
            },
            {
                path: 'retail',
                children: [
                    {path: '', redirectTo: 'id-scans', pathMatch: 'full'},
                    {path: 'id-scans', component: IdScansComponent},
                    {path: 'transactions', component: IdTransactionsComponent},
                    {path: 'age-categories', component: AgeCategoriesComponent},
                    {path: 'purchase-orders', component: PurchaseOrdersComponent},
                    {path: 'guests', component: RetailGuestComponent}
                ]
            },
            {
                path: 'guests',
                children: [
                    { path: '', redirectTo: 'summary', pathMatch: 'full' },
                    { path: 'summary', component: GuestSummaryComponent },
                ]
            },
            {
                path: 'inventory',
                children: [
                    { path: '', redirectTo: 'stock-history', pathMatch: 'full' },
                    { path: 'stock-history', component: StockHistoryComponent },
                    { path: 'valuation-report', component: ValuationReportComponent },
                ]
            },
        ]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
