import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProgressService {

    private _loading = false;
    private _progressPercent = null;
    public progressMessage = 'Loading';
    public progressWidth = '0px';

    constructor() { }

    set loading(value) {
        this._loading = value;
        if (value === false) {
            this.progressPercent = null;
        }
    }

    get loading() {
        return this._loading;
    }

    set progressPercent(percent) {
        this._progressPercent = percent;
        if (percent === null) {
            this.progressWidth = '0px';
        } else {
            this.progressWidth = Math.floor(percent * 3) + 'px';
        }
    }

    get progressPercent() {
        return this._progressPercent;
    }

}
