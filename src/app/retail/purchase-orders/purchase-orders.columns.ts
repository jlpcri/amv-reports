import {ColumnDef} from '../../shared/types/columnDef';

export const COLUMNS: ColumnDef[] = [
    {
        html: 'Date',
        field: 'date',
        label: 'Date',
        type: 'date'
    },
    {
        html: 'Invoice ID',
        field: 'invoiceId',
        label: 'Invoice ID'
    },
    {
        html: 'Store Name',
        field: 'storeName',
        label: 'Store Name',
        limit: true
    },
    {
        html: 'SKU',
        field: 'sku',
        label: 'SKU'
    },
    {
        html: 'Product Name',
        field: 'productName',
        label: 'Product Name',
        limit: true
    },
    {
        html: 'Quantity',
        field: 'quantity',
        label: 'Quantity'
    },
    {
        html: 'Unit Price',
        field: 'unitPrice',
        label: 'Unit Price'
    },
    {
        html: 'Total Cost',
        field: 'totalCost',
        label: 'Total Cost'
    },
];
