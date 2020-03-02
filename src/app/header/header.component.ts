import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {UserInfoService} from "../shared/user-info/user-info.service";
import {UserInfo} from "../shared/user-info/user-info.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  private base = '';
  private userInfo: UserInfo;

  constructor(private router: Router, private userInfoService: UserInfoService ) {
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

}
