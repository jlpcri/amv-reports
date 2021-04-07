import {ColumnDef} from '../../shared/types/columnDef';

export const COLUMNS: ColumnDef[] = [
    {
        field: 'createdAt',
        label: 'Order Date',
        type: 'date',
    },
    {
        field: 'id',
        label: 'AMV ID',
        type: 'integer',
    },
    {
        field: 'source',
        label: 'Source',
        type: 'string',
    },
    {
        field: 'sourceId',
        label: 'Order ID',
        type: 'string',
    },
    {
        field: 'invoiceId',
        label: 'Invoice ID',
        type: 'string',
    },
    {
        field: 'status',
        label: 'Status',
        type: 'string',
    },
    {
        field: 'sku',
        label: 'SKU',
        type: 'string',
    },
    {
        field: 'productName',
        label: 'Product',
        type: 'string',
        limit: true
    },
    {
        field: 'quantity',
        label: 'Quantity',
        type: 'number',
        justify: 'right'
    },
    {
        field: 'price',
        label: 'Base Price',
        type: 'money',
        justify: 'right'
    },
    {
        field: 'netPrice',
        label: 'Net Price',
        type: 'money',
        justify: 'right'
    },
    {
        field: 'cost',
        label: 'Cost',
        type: 'money',
        justify: 'right',
    },
    {
        field: 'orderSubtotal',
        label: 'Order Subtotal',
        type: 'money',
        justify: 'right'
    },
    {
        field: 'discount',
        label: 'Discount',
        type: 'money',
        justify: 'right'
    },
    {
        field: 'discountPercent',
        label: 'Discount Percent',
        type: 'number',
        justify: 'right'
    },
    {
        field: 'couponCode',
        label: 'Coupon Code',
        type: 'string',
        justify: 'left'
    },
    {
        field: 'size',
        label: 'Size',
        type: 'integer',
        justify: 'right'
    },
    {
        field: 'strength',
        label: 'Strength',
        type: 'integer',
        justify: 'right'
    },
    {
        field: 'productGroup',
        label: 'Product Group',
        type: 'string',
        limit: true
    },
    {
        field: 'manufacturer',
        label: 'Manufacturer',
        type: 'string',
    },
    {
        field: 'customerGroup',
        label: 'Customer Group',
        type: 'string',
    },
    {
        field: 'billTo',
        label: 'Bill To',
        type: 'string',
    },
    {
        field: 'shipTo',
        label: 'Ship To',
        type: 'string',
    },
    {
        field: 'shippingStreet',
        label: 'Shipping Street',
        type: 'string',
        limit: true
    },
    {
        field: 'shippingRegion',
        label: 'Shipping Region',
        type: 'string',
    },
    {
        field: 'shippingZipCode',
        label: 'Shipping Zip Code',
        type: 'string',
    },
    {
        field: 'licenseReceived',
        label: 'License',
        type: 'string',
    },
    {
        field: 'licenseDate',
        label: 'License Date',
        type: 'string',
    },
];
