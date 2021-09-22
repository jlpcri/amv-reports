import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedComponent } from './shipped.component';
import {ReportService} from '../../shared/report/report.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ShippedComponent', () => {
  let component: ShippedComponent;
  let fixture: ComponentFixture<ShippedComponent>;

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
          declarations: [ ShippedComponent ],
          imports: [ HttpClientTestingModule ],
          providers: [
              {provide: ReportService, useValue: reportService},
              { provide: MatSnackBar, useValue: snackbarSpy}
          ]
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
