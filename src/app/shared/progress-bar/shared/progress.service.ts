import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProgressService {

    private _loading = false;
    public progressPercent;
    public progressMessage = 'Loading';
    public totalCount = 0;
    public currentCount = 0;
    public cancel$ = new Subject<any>();
    public progress$ = new Subject<any>();

    constructor() {
        this.cancel$.subscribe(() => {
            this.loading = false;
        });
        this.progress$.subscribe(() => {
            this.currentCount += 1;
            this.progressPercent = Math.round((this.currentCount / this.totalCount) * 100)
            if (this.currentCount >= this.totalCount) {
                this.loading = false;
            }
        });
    }

    set loading(value) {
        this._loading = value;
        if (value === false) {
            this.progressPercent = null;
            this.totalCount = 0;
            this.currentCount = 0;
        }
    }

    get loading() {
        return this._loading;
    }
}
