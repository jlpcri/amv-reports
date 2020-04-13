import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestSummaryComponent } from './guest-summary.component';

describe('GuestSummaryComponent', () => {
  let component: GuestSummaryComponent;
  let fixture: ComponentFixture<GuestSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
