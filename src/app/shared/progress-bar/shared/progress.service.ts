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
    public done$ = new Subject<any>();

    constructor() {
        this.cancel$.subscribe(() => {
            this.done$.next();
        });
        this.progress$.subscribe((count: number) => {
            if (this.totalCount === 0) {
                this.done$.next();
            } else {
                this.currentCount += count ?? 1;
                this.progressPercent = Math.round((this.currentCount / this.totalCount) * 100);
                if (this.currentCount >= this.totalCount) {
                    this.done$.next();
                }
            }
        });
        this.done$.subscribe(() => {
            this.loading = false;
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
