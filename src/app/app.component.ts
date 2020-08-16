import {Component, OnInit} from '@angular/core';
import {IndexedDatabaseService} from "./shared/indexed-database.service";
import {ProgressService} from "./shared/progress-bar/shared/progress.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'amv-reports';

  constructor(private indexedDatabaseService: IndexedDatabaseService) {
  }

  ngOnInit(): void {
      this.indexedDatabaseService.init();
  }
}
