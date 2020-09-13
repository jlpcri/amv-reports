import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LayoutService} from '../shared/layout.service';

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.css']
})

export class SidemenuComponent implements OnInit, AfterViewChecked {

    private firstChild = '';
    base = '';
    @ViewChild('sideMenuDiv') sideMenuDiv;

    constructor(private router: Router, private layout: LayoutService) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const segments = event.urlAfterRedirects.split('\/');
                this.base = segments[1];
                this.firstChild = segments[2];
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewChecked() {
        this.sideMenuDiv.nativeElement.style.top = this.layout.headerHeight + 'px';
        this.layout.sidebarWidth = this.sideMenuDiv.nativeElement.offsetWidth;
    }

    childRoutes(): string[] {
        const childRoutes = [];
        this.router.config.forEach(route => {
            if (route.path === this.base && route.children) {
                route.children.forEach(child => {
                    if (child.path.replace(/\s+/,'').length > 0) {
                        childRoutes.push(child.path);
                    }
                });
            }
        });
        return childRoutes;
    }

    isActive(path: string): boolean {
        return path === this.firstChild;
    }

    setRoute(path) {
        this.router.navigate([path]).then();
    }
}
