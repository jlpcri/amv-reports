import {async, TestBed} from '@angular/core/testing';

import {ReportComponent} from './report.component';

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
          startDate$: {
              next: jasmine.createSpy()
          },
          stopDate$: {
              next: jasmine.createSpy()
          }
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
