import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldDatePickerComponent } from './date-picker.component';

describe('OldDatePickerComponent', () => {
  let component: OldDatePickerComponent;
  let fixture: ComponentFixture<OldDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
