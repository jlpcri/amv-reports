import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {LayoutService} from '../shared/layout.service';
import {UserInfoService} from '../shared/user-info/user-info.service';
import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {Observable, Subject, of} from 'rxjs';

@Component({
    selector: 'app-home',
    template: '<h1>Home</h1>'
})
export class MockHomeComponent { }

const router = {
    config: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: MockHomeComponent }
    ],
    events: new Subject<{}>()
};

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        const userInfoServiceSpy = jasmine.createSpyObj('UserInfoService', ['getUserInfo']);
        userInfoServiceSpy.getUserInfo.and.returnValue(of({name: 'Homer'}));
        TestBed.configureTestingModule({
            declarations: [ HeaderComponent ],
            providers: [
                LayoutService,
                { provide: Router, useValue: router },
                { provide: UserInfoService, useValue: userInfoServiceSpy }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
