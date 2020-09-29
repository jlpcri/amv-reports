import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdScansComponent } from './id-scans.component';
import {IdScanService} from './shared/id-scan.service';
import {OptionService} from '../../shared/option.service';

describe('IdScansComponent', () => {
    let component: IdScansComponent;
    let fixture: ComponentFixture<IdScansComponent>;

    beforeEach(async(() => {
        const idScanServiceSpy = jasmine.createSpyObj('IdScanService', ['retrieve']);
        TestBed.configureTestingModule({
            declarations: [ IdScansComponent ],
            providers: [
                OptionService,
                { provide: IdScanService, useValue: idScanServiceSpy }
            ]
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
