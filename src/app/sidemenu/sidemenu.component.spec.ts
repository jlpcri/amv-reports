import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuComponent } from './sidemenu.component';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

const router = {
    config: [
    ],
    events: new Subject<{}>()
};

describe('SidemenuComponent', () => {
    let component: SidemenuComponent;
    let fixture: ComponentFixture<SidemenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SidemenuComponent ],
            providers: [ { provide: Router, useValue: router }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidemenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
