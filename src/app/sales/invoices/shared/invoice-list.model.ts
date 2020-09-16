import {Invoice} from './invoice.model';

export class InvoiceList {
    records: Invoice[];
    page: number;
    pageSize: number;
    totalRecords?: number;
    totalPages?: number;
}
