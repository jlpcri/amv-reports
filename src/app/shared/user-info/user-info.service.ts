import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {UserInfo} from "./user-info.model";
import {ReportsApiService} from "../reports-api/reports-api.service";

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    private userInfoSubject: Subject<UserInfo> = new Subject<UserInfo>();
    constructor(private reportsApiService: ReportsApiService ) { }

    getUserInfo(): Observable<UserInfo> {
        let url = '/user/user-info';
        this.reportsApiService.get<UserInfo>(url).subscribe(
            userInfo => {
                userInfo.firstName = userInfo.name.replace(/\s.*/,'');
                this.userInfoSubject.next(userInfo)
            }
        );
        return this.userInfoSubject;
    }
}
