import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { Invoice} from '../../../shared/types/invoice';
import {TableDataSource} from './tableDataSource';

describe('DataTableComponent', () => {
  let component: DataTableComponent<Invoice>;
  let fixture: ComponentFixture<DataTableComponent<Invoice>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      // TODO: Needs a way to pass in a data source before it fully initializes
      // Angular seems not to support this out of the box?
    const dataSource = new TableDataSource<Invoice>([]);
    fixture = TestBed.createComponent<DataTableComponent<Invoice>>(DataTableComponent);
    component = fixture.componentInstance;
    component.dataSource = dataSource;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
