import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from './invoices/invoices.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {EcommSkusComponent} from './ecomm-skus/ecomm-skus.component';
import { ShippedComponent } from './shipped/shipped.component';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [InvoicesComponent, EcommSkusComponent, ShippedComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        SharedModule,
        MatButtonModule,
        MatSnackBarModule
    ],
})
export class SalesModule { }
