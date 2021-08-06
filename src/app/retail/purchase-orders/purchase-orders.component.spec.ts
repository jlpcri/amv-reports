import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersComponent } from './purchase-orders.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReportService} from '../../shared/report/report.service';
import {MatSnackBar} from '@angular/material/snack-bar';

describe('PurchaseOrdersComponent', () => {
  let component: PurchaseOrdersComponent;
  let fixture: ComponentFixture<PurchaseOrdersComponent>;

  beforeEach(async(() => {
      const reportService = {
          getRegions: jasmine.createSpy().and.stub(),
          getSites: jasmine.createSpy().and.stub(),
          regions$: {
              pipe: jasmine.createSpy()
          },
          sites$: {
              pipe: jasmine.createSpy()
          }
      };
      const snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
      TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersComponent ],
        imports: [ HttpClientTestingModule ],
        providers: [
            {provide: ReportService, useValue: reportService},
            { provide: MatSnackBar, useValue: snackbarSpy}

        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
