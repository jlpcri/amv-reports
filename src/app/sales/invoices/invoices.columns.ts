import {ColumnDef} from '../../shared/types/columnDef';

export const COLUMNS: ColumnDef[] = [
    {
        html: 'Invoice ID',
        field: 'invoiceId',
        label: 'Invoice ID',
    },
    {
        html: 'Payment<br>Date',
        field: 'paymentDate',
        label: 'Payment Date',
        type: 'date'
    },
    {
        html: 'Order<br>Created',
        field: 'createdAt',
        label: 'Created Date',
        type: 'date'
    },
    {
        html: 'Order<br>Updated',
        field: 'updatedAt',
        label: 'Updated Date',
        type: 'date'
    },
    {
        html: 'Order<br>Refunded',
        field: 'refundedAt',
        label: 'Refunded Date',
        type: 'date'
    },
    {
        html: 'Payment<br>Amount',
        justify: 'right',
        field: 'paymentAmount',
        label: 'Payment Amount',
        type: 'money'
    },
    {
        html: 'Grand<br>Total',
        justify: 'right',
        field: 'grandTotal',
        label: 'Grand Total',
        type: 'money'
    },
    {
        html: 'Shipping<br>Amount',
        justify: 'right',
        field: 'shippingAmount',
        label: 'Shipping Amount',
        type: 'money'
    },
    {
        html: 'Tax<br>Amount',
        justify: 'right',
        field: 'taxAmount',
        label: 'Tax Amount',
        type: 'money'
    },
    {
        html: 'Excise Tax<br>Amount',
        justify: 'right',
        field: 'exciseTaxAmount',
        label: 'Excise Tax Amount',
        type: 'money'
    },
    {
        html: 'Refund<br>Amount',
        justify: 'right',
        field: 'refundAmount',
        label: 'Refund Amount',
        type: 'money'
    },
    {
        html: 'Customer<br>Credit',
        justify: 'right',
        field: 'creditAmount',
        label: 'Credit Amount',
        type: 'money'
    },
    {
        html: 'Discount<br>Amount',
        justify: 'right',
        field: 'discountAmount',
        label: 'Discount Amount',
        type: 'money'
    },
    {
        html: 'Discount Code',
        field: 'couponCode',
        label: 'Discount Code'
    },
    {
        html: 'Subtotal',
        justify: 'right',
        field: 'subtotal',
        label: 'Subtotal',
        type: 'money'
    },
    {
        html: 'Net Price',
        justify: 'right',
        field: 'netPrice',
        label: 'Net Price',
        type: 'money'
    },
    {
        html: 'Status',
        field: 'status',
        label: 'Status',
    },
    {
        html: 'Customer<br>Group',
        field: 'customerGroup',
        label: 'Customer Group',
    },
    {
        html: 'Source',
        field: 'sourceSystem',
        label: 'Source'
    },
    {
        html: 'Order ID',
        field: 'sourceId',
        label: 'Order ID'
    },
    {
        html: 'Ship to<br>First Name',
        field: 'shippingAddress.firstName',
        label: 'Shipping First Name'
    },
    {
        html: 'Ship to<br>Last Name',
        field: 'shippingAddress.lastName',
        label: 'Shipping Last Name'
    },
    {
        html: 'Ship to<br>Region',
        field: 'shippingAddress.state',
        label: 'Shipping Region'
    },
    {
        html: 'Customer<br>Note',
        field: 'customerNote',
        label: 'Customer Note',
        limit: true
    },
    {
        html: 'Payment<br>Method',
        field: 'paymentMethod',
        label: 'Payment Method',
        limit: true
    },
    {
        html: 'Billing<br>First Name',
        field: 'billingAddress.firstName',
        label: 'Billing First Name'
    },
    {
        html: 'Billing<br>Last Name',
        field: 'billingAddress.lastName',
        label: 'Billing Last Name'
    },
    {
        html: 'Billing Street',
        field: 'billingAddress.line1',
        label: 'Billing Street',
        limit: true
    },
    {
        html: 'Billing City',
        field: 'billingAddress.city',
        label: 'Billing City'
    },
    {
        html: 'Billing<br>Region',
        field: 'billingAddress.state',
        label: 'Billing Region'
    },
    {
        html: 'Billing<br>Postal Code',
        field: 'billingAddress.zipCode',
        label: 'Billing Postal Code'
    }
];
