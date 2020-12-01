export class PagedResult<T> {
    offsetId?: number;
    page?: number;
    pageSize?: number;
    totalRecords: number;
    records: T[];
}
