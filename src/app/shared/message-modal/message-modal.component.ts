import { Component, OnInit } from '@angular/core';
import {MessageService} from "./shared/message.service";
import {Message} from "./shared/message.model";

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

    message: Message;
    constructor(private messageService: MessageService) { }

    ngOnInit() {
        this.messageService.messageSubject.subscribe((message) => {
            this.message = message;
        });
    }

    close() {
        this.message = null;
    }

    nothing() {}

}
