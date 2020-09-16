import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';
import {UserInfoService} from '../shared/user-info/user-info.service';
import {UserInfo} from '../shared/user-info/user-info.model';
import {LayoutService} from '../shared/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, AfterViewChecked {

  base = '';
  userInfo: UserInfo;
  routes: Route[];
  paths: string[] = [];

  @ViewChild('headerDiv') headerDiv: ElementRef;

    constructor(private router: Router, private userInfoService: UserInfoService, private layout: LayoutService ) {
        this.routes = router.config;
        router.config.forEach(route => {
            const path = route.path.replace(/\s*/,'');
            if (path.length > 0) {
                this.paths.push(path);
            }
        });
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.base = event.urlAfterRedirects.split('\/')[1];
            }
        });
    }

  ngOnInit() {
      this.userInfoService.getUserInfo().subscribe(
          userInfo => this.userInfo = userInfo
      );
  }

  ngAfterViewChecked() {
        this.layout.headerHeight = this.headerDiv.nativeElement.offsetHeight;
  }

    setRoute(path: string) {
        this.router.navigate(['/' + path]).then();
  }

}
