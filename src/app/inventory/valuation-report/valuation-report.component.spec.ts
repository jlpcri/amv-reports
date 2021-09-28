import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ValuationReportComponent} from './valuation-report.component';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ReportService} from '../../shared/report/report.service';
import {MatSnackBar} from '@angular/material/snack-bar';

describe('ValuationReportComponent', () => {
  let component: ValuationReportComponent;
  let fixture: ComponentFixture<ValuationReportComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    const reportServiceSpy = jasmine.createSpy();
    const matSnackBarSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      declarations: [ ValuationReportComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ReportService, useValue: reportServiceSpy},
        { provide: MatSnackBar, useValue: matSnackBarSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ValuationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
