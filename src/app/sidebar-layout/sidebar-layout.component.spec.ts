import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLayoutComponent } from './sidebar-layout.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ReportsApiService} from '../shared/reports-api/reports-api.service';

describe('SidebarLayoutComponent', () => {
  let component: SidebarLayoutComponent;
  let fixture: ComponentFixture<SidebarLayoutComponent>;

  beforeEach(async(() => {
      const reportsApiService = {
          get: () => {
              return {
                  subscribe: jasmine.createSpy()
              };
          },
      };
    TestBed.configureTestingModule({
      declarations: [ SidebarLayoutComponent ],
        imports: [ RouterTestingModule.withRoutes([{path: '', children: [{path: 'test', component: SidebarLayoutComponent}]}])],
        providers: [{ provide: ReportsApiService, useValue: reportsApiService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
