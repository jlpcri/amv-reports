export class PageableTableColumn {
    name: string;
    label: string;
    description: string;
    type: string; // string, number, integer
    style: string;
    sortOrder?: number;
    showSortOrder?: number;
    click?: any;
}
