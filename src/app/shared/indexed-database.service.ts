import { Injectable } from '@angular/core';
import {MessageService} from "./message-modal/shared/message.service";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class IndexedDatabaseService {

    public db;
    private version = 1;

    constructor(private messageService: MessageService) { }

    init() {
        let request = indexedDB.open("AmvReportsDatabase", this.version);
        request.onerror = (event: any) => {
            this.messageService.error("Could not open browser database",
                JSON.stringify(event,null,2));
        };
        request.onsuccess = (event: any) => {
            this.db = event.target.result;
            this.db.onerror = (event: any) => {
                this.messageService.error("Database Error", JSON.stringify(event,null,2));
            }
        };
        request.onupgradeneeded = (event: any) => {
            let db = event.target.result;
            let objectStore = db.createObjectStore("id-scan", {keyPath: "id"});
            objectStore.createIndex("event-timestamp", "eventTimestamp", { unique: false });

            objectStore = db.createObjectStore("order", {keyPath: "id"});
            objectStore.createIndex('payment-date', 'paymentDate', {unique: false});

            db.createObjectStore("customer-id-scan", {keyPath: "customerId"});
            db.createObjectStore("product", {keyPath: "id"});
            this.db = db;
        }
    }

    maxValue(storeName: string, indexName: string, field: string): Observable<any> {
        let subject = new Subject<any>();
        let cursor = this.db
            .transaction(storeName, 'readonly')
            .objectStore(storeName)
            .index(indexName)
            .openCursor(null, 'prev');
        cursor.onsuccess = (event) => {
            if (event.target.result) {
                subject.next(event.target.result.value[field]);
            } else {
                subject.next(null);
            }
        };
        return subject;
    }

}
