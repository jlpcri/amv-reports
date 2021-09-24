import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommSkusComponent } from './ecomm-skus.component';
import {Subject} from 'rxjs';
import {EcommSkusService} from './ecomm-skus.service';

describe('EcommSkusComponent', () => {
  let component: EcommSkusComponent;
  let fixture: ComponentFixture<EcommSkusComponent>;

  beforeEach(async(() => {
    const mockEcommSkuService = {
      skus$: new Subject(),
      sites$: new Subject(),
      selectedSites$: new Subject(),
      date$: new Subject(),
      regions$: new Subject(),
      getRegions: () => {},
      selectedRegions$: new Subject(),
      startDate$: new Subject(),
      stopDate$: new Subject()
    };
    TestBed.configureTestingModule({
      declarations: [ EcommSkusComponent ],
        providers: [
            {provide: EcommSkusService, useValue: mockEcommSkuService}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommSkusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
