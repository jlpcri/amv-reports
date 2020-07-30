import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdScansComponent } from './id-scans.component';

describe('IdScansComponent', () => {
  let component: IdScansComponent;
  let fixture: ComponentFixture<IdScansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdScansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdScansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
