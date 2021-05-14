import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from './invoices/invoices.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../shared/icons/icons.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MonthlyDateHeaderComponent } from './shared/date-picker/monthly-date-header.component';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataTableComponent } from './shared/data-table/data-table.component';
import {EcommSkusComponent} from './ecomm-skus/ecomm-skus.component';
import { ShippedComponent } from './shipped/shipped.component';

@NgModule({
    declarations: [InvoicesComponent, MonthlyDateHeaderComponent, DatePickerComponent, DataTableComponent, EcommSkusComponent, ShippedComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IconsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDividerModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatSnackBarModule
    ],
})
export class SalesModule { }
