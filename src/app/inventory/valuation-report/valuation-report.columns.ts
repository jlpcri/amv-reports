import {ColumnDef} from '../../shared/types/columnDef';

export const COLUMNS: ColumnDef[] = [
    {
        field: 'eventDate',
        label: 'Most Recent Event Date',
        html: 'Most&nbsp;Recent<br>Event&nbsp;Date',
        type: 'date'
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
        label: 'Manufacturer',
        limit: true
    },
    {
        field: 'quantityOnHand',
        label: 'Quantity On Hand',
        html: 'Quantity On&nbsp;Hand',
        justify: 'right'
    },
    {
        field: 'finaleCostEach',
        label: 'Finale Average Cost Each',
        html: 'Finale&nbsp;Average Cost Each',
        type: 'money',
        justify: 'right'
    },
    {
        field: 'finaleInvCost',
        label: 'Finale Inventory Valuation',
        html: 'Finale Inventory Valuation',
        type: 'money',
        justify: 'right'
    },
    {
        field: 'sourceSystem',
        label: 'Source System'
    }
];
