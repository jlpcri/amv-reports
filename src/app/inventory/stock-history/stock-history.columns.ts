import {ColumnDef} from '../../shared/types/columnDef';

export const COLUMNS: ColumnDef[] = [
    {
        field: 'sourceId',
        label: 'Source ID'
    },
    {
        field: 'itemId',
        label: 'Item ID'
    },
    {
        field: 'createdAt',
        label: 'Created Date',
        html: 'Created&nbsp;Date',
        type: 'date'
    },
    {
        field: 'updatedAt',
        label: 'Updated Date',
        html: 'Updated&nbsp;Date',
        type: 'date'
    },
    {
        field: 'transaction',
        label: 'Transaction',
        limit: true
    },
    {
        field: 'transactionType',
        label: 'Transaction Type'
    },
    {
        field: 'transactionStatus',
        label: 'Transaction Status'
    },
    {
        field: 'productSku',
        label: 'Product SKU'
    },
    {
        field: 'productName',
        label: 'Product Name',
        limit: true
    },
    {
        field: 'manufacturer',
        label: 'Manufacturer'
    },
    {
        field: 'quantity',
        label: 'Quantity',
        justify: 'right'
    },
    {
        field: 'priceEach',
        label: 'Price Each',
        type: 'money',
        justify: 'right'
    },
    {
        field: 'employee',
        label: 'Employee'
    },
];
