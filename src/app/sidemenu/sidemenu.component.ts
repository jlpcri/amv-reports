import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  private firstChild = '';
  private base = '';

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let segments = event.urlAfterRedirects.split('\/');
        this.base = segments[1];
        this.firstChild = segments[2];
      }
    });
  }

  ngOnInit() {
  }

  private childRoutes() : string[] {
    let childRoutes = [];
    this.router.config.forEach(route => {
      if (route.path === this.base && route.children) {
        route.children.forEach(child => {
          childRoutes.push(child.path)
        })
      }
    });
    return childRoutes;
  }
  private isActive(path: string): boolean {
    return path === this.firstChild;
  }
}
