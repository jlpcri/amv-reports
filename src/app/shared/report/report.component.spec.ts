import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComponent } from './report.component';
import {ReportService} from './report.service';
import {Subject} from 'rxjs';

describe('ReportComponent', () => {
  let component;
  let fixture;
  let mockReportService;

  beforeEach(async(() => {
      mockReportService = {
          dataSource: {
              displayedColumns$: jasmine.createSpyObj('Subject', ['next']),
              columns: [],
              data: []
          },
          date$: {
              next: jasmine.createSpy()
          },
          startDate$: new Subject(),
          stopDate$: new Subject()
      };
      TestBed.configureTestingModule({
        declarations: [ ReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    component.reportService = mockReportService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
