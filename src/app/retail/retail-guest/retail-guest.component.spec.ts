import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RetailGuestComponent} from './retail-guest.component';
import {RetailGuestService} from './shared/retail-guest.service';
import {OptionService} from '../../shared/option.service';
import {of} from 'rxjs';

describe('RetailGuestComponent', () => {
    let component: RetailGuestComponent;
    let fixture: ComponentFixture<RetailGuestComponent>;

    beforeEach(async(() => {
        const retailGuestServiceSpy = jasmine.createSpyObj('RetailGuestServiceSpy', { retrieveAllGuests: of([])});
        TestBed.configureTestingModule({
            declarations: [RetailGuestComponent],
            providers: [
                { provide: RetailGuestService, useValue: retailGuestServiceSpy}
            ]
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
