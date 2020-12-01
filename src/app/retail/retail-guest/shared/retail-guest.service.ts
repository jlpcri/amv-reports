import { Injectable } from '@angular/core';
import {ReportsApiService} from '../../../shared/reports-api/reports-api.service';
import {Observable, Subject, of} from 'rxjs';
import {PagedResult} from '../../../shared/reports-api/paged-result.model';
import {RetailGuest} from './retail-guest.model';
import {HttpParams} from '@angular/common/http';
import {ProgressService} from '../../../shared/progress-bar/shared/progress.service';

@Injectable({
  providedIn: 'root'
})
export class RetailGuestService {

    private allGuests = [];
    constructor(private reportsApiService: ReportsApiService, private progressService: ProgressService) { }

  retrieveAllGuests(refresh: boolean): Observable<RetailGuest[]> {
      const retailGuestSubject: Subject<RetailGuest[]> = new Subject<RetailGuest[]>();

      if (this.allGuests.length > 0 && !refresh) {
          return of(this.allGuests);
      } else {
          this.allGuests = [];
      }

      const self = this;
      self.progressService.progressMessage = 'Loading Retail Guests...';
      self.progressService.loading = true;
      self.progressService.progressPercent = 1;
      let page = 0;
      const options = {
          params: new HttpParams().set('source', 'amvpos').set('page', '' + page)
      };
      function getPage() {
          self.progressService.progressMessage = 'Loading Retail Guests...';
          self.progressService.loading = true;
          self.reportsApiService.get<PagedResult<RetailGuest>>('/guests', options).subscribe(
              resp => {
                  for (const guest of resp.records) {
                      self.allGuests.push(Object.assign(new RetailGuest(), guest));
                  }
                  self.progressService.progressPercent = self.allGuests.length * 100 / resp.totalRecords;
                  if (self.allGuests.length >= resp.totalRecords) {
                      retailGuestSubject.next(self.allGuests);
                      self.progressService.loading = false;
                  } else {
                      ++page;
                      options.params = options.params.set('page', '' + page);
                      getPage();
                  }
              }, error => {
                  retailGuestSubject.next([]);
                  self.progressService.loading = false;
              }
          );
      }
      getPage();
      return retailGuestSubject;
  }
}
