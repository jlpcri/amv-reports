import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from './invoices/invoices.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {EcommSkusComponent} from './ecomm-skus/ecomm-skus.component';
import { ShippedComponent } from './shipped/shipped.component';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CustomerSkuComponent } from './customer-sku/customer-sku.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [InvoicesComponent, EcommSkusComponent, ShippedComponent, CustomerSkuComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        SharedModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatInputModule,
        ReactiveFormsModule
    ],
})
export class SalesModule { }
