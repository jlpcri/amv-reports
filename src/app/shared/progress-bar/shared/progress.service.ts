import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProgressService {

    public loading = false;
    public progressPercent: number = 0;
    public progressMessage: string = "Loading";

    constructor() { }


}
