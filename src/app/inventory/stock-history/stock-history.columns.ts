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
        field: 'eventDate',
        label: 'Event Date',
        html: 'Event&nbsp;Date',
        type: 'date'
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
        field: 'quantityOnHand',
        label: 'Quantity On Hand',
        html: 'Quantity On&nbsp;Hand',
        justify: 'right'
    },
    {
        field: 'priceEach',
        label: 'Price Each',
        type: 'money',
        justify: 'right'
    },
    {
        field: 'avgOnHandCost',
        label: 'Average On Hand Cost',
        type: 'money',
        justify: 'right'
    },
    {
        field: 'eventCost',
        label: 'Event Cost',
        type: 'money',
        justify: 'right'
    },
    {
        field: 'eventCostEach',
        label: 'Event Cost Each',
        type: 'money',
        justify: 'right'
    },
    {
        field: 'employee',
        label: 'Employee'
    },
];
