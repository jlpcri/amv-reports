import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {UserInfo} from "./user-info.model";
import {ReportsApiService} from "../reports-api/reports-api.service";

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    userInfo$: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(undefined);
    constructor(private reportsApiService: ReportsApiService ) {

    }

    getUserInfo(): BehaviorSubject<UserInfo> {
        const url = '/../../user/user-info';
        this.reportsApiService.get<UserInfo>(url).subscribe(
            userInfo => {
                userInfo.firstName = userInfo.name.replace(/\s.*/, '');
                this.userInfo$.next(userInfo);
            }
        );
        return this.userInfo$;
    }
}
