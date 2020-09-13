import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LayoutService} from './shared/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'amv-reports';
  @ViewChild('mainContent') mainContentDiv: ElementRef;

  constructor(private layout: LayoutService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
      this.mainContentDiv.nativeElement.style.left = this.layout.sidebarWidth + 'px';
      this.mainContentDiv.nativeElement.style.top = this.layout.headerHeight + 'px';
  }
}
