import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthlyDateHeaderComponent } from './monthly-date-header.component';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

describe('MonthlyDateHeaderComponent', () => {
    let component: MonthlyDateHeaderComponent;
    let fixture: ComponentFixture<MonthlyDateHeaderComponent>;

    beforeEach(async(() => {
        const mockCalendar = {
            stateChanges: new Observable(),
            minDate: moment(),
            maxDate: moment(),
            activeDate: moment()
        };
        const mockDateAdapter = {
            format() { return ''; }
        };

        TestBed.configureTestingModule({
            declarations: [ MonthlyDateHeaderComponent ],
            providers: [
                { provide: MatCalendar, useValue: mockCalendar },
                { provide: DateAdapter, useValue: mockDateAdapter },
                { provide: MAT_DATE_FORMATS, useValue: {} }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MonthlyDateHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
