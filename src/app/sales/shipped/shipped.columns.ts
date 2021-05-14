import {ColumnDef} from '../../shared/types/columnDef';

export const COLUMNS: ColumnDef[] = [
    {
        field: 'firstName',
        label: 'First Name',
        limit: true
    },
    {
        field: 'lastName',
        label: 'Last Name',
        limit: true
    },
    {
        field: 'line1',
        label: 'Line 1',
        limit: true
    },
    {
        field: 'line2',
        label: 'Line 2'
    },
    {
        field: 'state',
        label: 'State'
    },
    {
        html: 'Postal<br>Code',
        field: 'postalCode',
        label: 'Postal Code'
    },
    {
        html: 'Product&nbsp;Name',
        field: 'productName',
        label: 'Product Name',
        limit: true
    },
    {
        field: 'sku',
        label: 'SKU'
    },
    {
        field: 'price',
        label: 'Price',
        type: 'money',
        justify: 'right'
    },
    {
        html: 'Quantity<br>Invoiced',
        justify: 'right',
        field: 'quantityInvoiced',
        label: 'Quantity Invoiced',
    },
    {
        html: 'Payment<br>Date',
        field: 'paymentDate',
        label: 'Payment Date',
        type: 'date'
    },
    {
        html: 'Shipment<br>Date',
        field: 'shipmentDate',
        label: 'Shipment Date',
        type: 'date'
    },
    {
        field: 'sourceId',
        label: 'Source ID'
    },
    {
        html: 'Source<br>System',
        field: 'sourceSystem',
        label: 'Source System'
    },

    {
        html: 'Group Name',
        field: 'groupName',
        label: 'Group Name',
        limit: true
    },
    {
        html: 'Weight',
        justify: 'right',
        field: 'weight',
        label: 'Weight',
    },
    {
        html: 'Cost',
        justify: 'right',
        field: 'cost',
        label: 'Cost',
    },
    {
        html: 'Bottle<br>Size',
        field: 'bottleSize',
        label: 'Bottle Size'
    },
    {
        html: 'Nic<br>Strength',
        field: 'nicStrength',
        label: 'Nic Strength'
    },
    {
        html: 'Device<br>Type',
        field: 'deviceType',
        label: 'Device Type'
    },
];
