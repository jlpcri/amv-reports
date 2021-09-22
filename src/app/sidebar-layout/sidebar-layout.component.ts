import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';
import {UserInfoService} from '../shared/user-info/user-info.service';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.css']
})
export class SidebarLayoutComponent {
    baseRoute: Route;
    firstName: string;
    topLinks: Route[];

    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        public userInfoService: UserInfoService
    ) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.baseRoute = this.activatedRoute.firstChild.routeConfig;
                this.topLinks = this.router.config[0].children.filter(route => route.path);
            }
        });
        this.userInfoService.userInfo$.subscribe(userInfo => {
            if (userInfo) {
                this.firstName = userInfo.firstName;
            }
        });
    }

    childRoutes(): Route[] {
        return this.baseRoute && this.baseRoute.children.filter(route => route.path);
    }
}
