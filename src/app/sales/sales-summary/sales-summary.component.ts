import { Component, OnInit } from '@angular/core';
import {ProgressService} from "../../shared/progress-bar/shared/progress.service";

@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html',
  styleUrls: ['./sales-summary.component.css']
})
export class SalesSummaryComponent implements OnInit {

  constructor(private progressService: ProgressService) { }

  ngOnInit() {
  }

}
