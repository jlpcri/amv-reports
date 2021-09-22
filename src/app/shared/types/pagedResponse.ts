export interface PagedResponse<T> {
    offset: number;
    page: number;
    pageSize: number;
    records: T[];
    totalRecords: number;
}
