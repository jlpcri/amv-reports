import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdTransactionsComponent } from './id-transactions.component';

describe('IdTransactionsComponent', () => {
  let component: IdTransactionsComponent;
  let fixture: ComponentFixture<IdTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
