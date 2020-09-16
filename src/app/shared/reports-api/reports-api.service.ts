import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsApiService {

    private baseUrl = '/amv-reports';
    constructor(private http: HttpClient) { }

    get<T>(url: string): Observable<T> {
        const respSubject: Subject<T> = new Subject<T>();
        this.http.get<T>(this.baseUrl + url).subscribe(
            resp => respSubject.next(resp),
            error => {
                if (error.url.endsWith('/login.html')) {
                    window.location = error.url;
                } else {
                    console.log(error);
                }
            }
        );
        return respSubject;
    }
}
