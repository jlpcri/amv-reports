import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    // here to hold the primary router outlet because the login page is currently outside the Angular app
  constructor() {
  }
}
