import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommSkuComponent } from './ecomm-sku.component';

describe('EcommSkuComponent', () => {
  let component: EcommSkuComponent;
  let fixture: ComponentFixture<EcommSkuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommSkuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
