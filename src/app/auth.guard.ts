import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {UserInfoService} from './shared/user-info/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    isAuthenticated$ = new Subject<boolean>();
    constructor(private userInfoService: UserInfoService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.userInfoService.getUserInfo().subscribe(value => {
          this.isAuthenticated$.next(!!value);
      });
      return this.isAuthenticated$;
  }

}
