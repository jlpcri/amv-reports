import {PageableTableColumn} from '../../../shared/pageable-table/shared/pageable-table-column.model';

export class EcommSkuColumns {
    static COLUMNS: PageableTableColumn[] = [
        {
            name: 'createdAt',
            label: 'Order Date',
            description: 'Order Date',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'id',
            label: 'AMV ID',
            description: 'AMV Internal ID',
            type: 'integer',
            style: 'left'
        },
        {
            name: 'source',
            label: 'Source',
            description: 'Source System',
            type: 'string',
            style: 'left'
        },
        {
            name: 'sourceId',
            label: 'Order ID',
            description: 'System Order ID',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'invoiceId',
            label: 'Invoice ID',
            description: 'Invoice ID',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'status',
            label: 'Status',
            description: 'Order Status',
            type: 'string',
            style: 'left'
        },
        {
            name: 'sku',
            label: 'SKU',
            description: 'SKU',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'productName',
            label: 'Product',
            description: 'Product Name',
            type: 'string',
            style: 'left'
        },
        {
            name: 'quantity',
            label: 'Quantity',
            description: 'Quantity',
            type: 'number',
            style: 'right'
        },
        {
            name: 'price',
            label: 'Base Price',
            description: 'Price',
            type: 'number',
            style: 'right'
        },
        {
            name: 'netPrice',
            label: 'Net Price',
            description: 'Net Price',
            type: 'number',
            style: 'right'
        },
        {
            name: 'cost',
            label: 'Cost',
            description: 'Cost',
            type: 'number',
            style: 'right',
        },
        {
            name: 'orderSubtotal',
            label: 'Order Subtotal',
            description: 'Order Subtotal',
            type: 'number',
            style: 'right'
        },
        {
            name: 'discount',
            label: 'Discount',
            description: 'Discount',
            type: 'number',
            style: 'right'
        },
        {
            name: 'discountPercent',
            label: 'Discount Percent',
            description: 'Discount Percent',
            type: 'number',
            style: 'right'
        },
        {
            name: 'couponCode',
            label: 'Coupon Code',
            description: 'Coupon Code',
            type: 'string',
            style: 'left'
        },
        {
            name: 'size',
            label: 'Size',
            description: 'Size',
            type: 'integer',
            style: 'right'
        },
        {
            name: 'strength',
            label: 'Strength',
            description: 'Strength',
            type: 'integer',
            style: 'right'
        },
        {
            name: 'productGroup',
            label: 'Product Group',
            description: 'Product Group',
            type: 'string',
            style: 'left'
        },
        {
            name: 'manufacturer',
            label: 'Manufacturer',
            description: 'Manufacturer',
            type: 'string',
            style: 'left'
        },
        {
            name: 'customerGroup',
            label: 'Customer Group',
            description: 'Customer Group',
            type: 'string',
            style: 'left'
        },
        {
            name: 'billTo',
            label: 'Bill To',
            description: 'Bill To',
            type: 'string',
            style: 'left'
        },
        {
            name: 'shipTo',
            label: 'Ship To',
            description: 'Ship To',
            type: 'string',
            style: 'left'
        },
        {
            name: 'shippingStreet',
            label: 'Shipping Street',
            description: 'Shipping Street',
            type: 'string',
            style: 'left'
        },
        {
            name: 'shippingRegion',
            label: 'Shipping Region',
            description: 'Shipping Region',
            type: 'string',
            style: 'left'
        },
        {
            name: 'shippingZipCode',
            label: 'Shipping Zip Code',
            description: 'Shipping Zip Code',
            type: 'string',
            style: 'left'
        },
        {
            name: 'licenseReceived',
            label: 'License',
            description: 'License',
            type: 'string',
            style: 'left'
        },
        {
            name: 'licenseDate',
            label: 'License Date',
            description: 'License Date',
            type: 'string',
            style: 'left'
        },
    ];
}
