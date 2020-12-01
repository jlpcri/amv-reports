import { Injectable } from '@angular/core';
import {MessageService} from './message-modal/shared/message.service';
import {Observable, Subject, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class IndexedDatabaseService {

    private db = null;
    private version = 1;

    constructor(private messageService: MessageService) { }

    getDb(): Observable<IDBOpenDBRequest> {
        if (this.db === null) {
            return this.init();
        } else {
            return of(this.db);
        }
    }

    init(): Observable<IDBOpenDBRequest> {
        const requestSubject = new Subject<IDBOpenDBRequest>();
        const request = indexedDB.open('AmvReportsDatabase', this.version);
        request.onerror = (event: any) => {
            this.messageService.error('Could not open browser database',
                JSON.stringify(event, null, 2));
            requestSubject.next(this.db);
        };
        request.onsuccess = (event: any) => {
            this.db = event.target.result;

            // Handle any future database errors
            this.db.onerror = (error: any) => {
                this.messageService.error('Database Error', JSON.stringify(error, null, 2));
            };
            requestSubject.next(this.db);
        };
        request.onupgradeneeded = (event: any) => {
            this.db = event.target.result;

            // Handle any future database errors
            this.db.onerror = (error: any) => {
                this.messageService.error('Database Error', JSON.stringify(error, null, 2));
            };

            this.upgradeDatabase();

            requestSubject.next(this.db);
        };
        return requestSubject;
    }

    upgradeDatabase() {
        const productStore = this.db.createObjectStore('product', {keyPath: 'id'});
        productStore.createIndex('sku', 'sku', { unique: false });
    }

    maxValue(storeName: string, indexName: string, field: string): Observable<any> {
        const subject = new Subject<any>();
        const cursor = this.db
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
