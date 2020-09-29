import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeCategoriesComponent } from './age-categories.component';
import {OptionService} from '../../shared/option.service';
import {AgeCategoriesService} from './shared/age-categories.service';

describe('AgeCategoriesComponent', () => {
    let component: AgeCategoriesComponent;
    let fixture: ComponentFixture<AgeCategoriesComponent>;

    beforeEach(async(() => {
        const ageCategoriesServiceSpy = jasmine.createSpyObj('AgeCategoriesService', ['retrieve']);
        TestBed.configureTestingModule({
            declarations: [ AgeCategoriesComponent ],
            providers: [
                OptionService,
                { provide: AgeCategoriesService, useValue: ageCategoriesServiceSpy }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AgeCategoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
