import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedComponent } from './shipped.component';
import {Subject} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {SalesModule} from '../sales.module';
import {ShippedService} from '../shipped/shipped.service';

describe('ShippedComponent', () => {
  let component: ShippedComponent;
  let fixture: ComponentFixture<ShippedComponent>;

  beforeEach(async(() => {
      const mockShippedService = {
          shippedItems$: new Subject(),
          sites$: new Subject(),
          selectedSite$: new Subject(),
          date$: new Subject(),
          regions$: new Subject(),
          getRegions: () => {},
          selectedRegion$: new Subject()
      };

      TestBed.configureTestingModule({
          declarations: [ ShippedComponent ],
          imports: [
              NoopAnimationsModule,
              MatPaginatorModule,
              MatSortModule,
              MatTableModule,
              MatFormFieldModule,
              MatSelectModule,
              SalesModule
          ],
          providers: [
              {provide: ShippedService, useValue: mockShippedService},
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
