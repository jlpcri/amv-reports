import {ColumnDef} from '../../shared/types/columnDef';

export const COLUMNS: ColumnDef[] = [
    {
        html: 'Source ID',
        field: 'customerSourceId',
        label: 'Source ID',
    },
    {
        html: 'Customer Group',
        field: 'customerGroup',
        label: 'Customer Group',
    },
    {
        html: 'First Name',
        field: 'customerFirstName',
        label: 'First Name'
    },
    {
        html: 'Last Name',
        field: 'customerLastName',
        label: 'Last Name'
    },
    {
        html: 'Company',
        field: 'customerCompany',
        label: 'Company'
    },
    {
        html: 'SKU',
        field: 'sku',
        label: 'SKU',
        limit: true
    },
    {
        html: 'Product Name',
        field: 'productName',
        label: 'Product Name',
        limit: true
    },
    {
        html: 'Quantity Invoiced',
        justify: 'right',
        field: 'quantityInvoiced',
        label: 'Quantity Invoiced',
    },
    {
        html: 'Cost Total',
        justify: 'right',
        field: 'costTotal',
        label: 'Cost Total',
        type: 'money'
    },
    {
        html: 'Sales Total',
        justify: 'right',
        field: 'salesTotal',
        label: 'Sales Total',
        type: 'money'
    },
];
