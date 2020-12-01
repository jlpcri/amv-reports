import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailGuestComponent } from './retail-guest.component';

describe('RetailGuestComponent', () => {
  let component: RetailGuestComponent;
  let fixture: ComponentFixture<RetailGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
