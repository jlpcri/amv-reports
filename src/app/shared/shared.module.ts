import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {MonthlyDateHeaderComponent} from './date-picker/monthly-date-header.component';
import {DataTableComponent} from './data-table/data-table.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ReportComponent } from './report/report.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    declarations: [
        DatePickerComponent,
        MonthlyDateHeaderComponent,
        DataTableComponent,
        ReportComponent,
    ],
    imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatMomentDateModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatDatepickerModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSelectModule,
        FormsModule
    ],
    exports: [
        DatePickerComponent,
        DataTableComponent,
        ReportComponent
    ]
})
export class SharedModule { }
