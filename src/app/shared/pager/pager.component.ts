import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

    @Input() data: any[];

    currentPage: number = 1;

    constructor() { }

    ngOnInit() {
    }

}
