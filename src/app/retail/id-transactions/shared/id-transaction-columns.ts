import {PageableTableColumn} from "../../../shared/pageable-table/shared/pageable-table-column.model";

export class IdTransactionColumns {
    static COLUMNS = [
        {
            name: 'scanTimestamp',
            label: 'Scan Timestamp',
            description: 'ID Scan Event Timestamp',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'orderTimestamp',
            label: 'Invoice Timestamp',
            description: 'Invoice Timestamp',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'transactionDelay',
            label: 'Seconds',
            description: 'Delay between id-scan and transaction',
            type: 'number',
            style: 'right fixed'
        },
        {
            name: 'register',
            label: 'Register',
            description: 'Register',
            type: 'string',
            style: 'left'
        },
        {
            name: 'location',
            label: 'Location',
            description: 'Location',
            type: 'string',
            style: 'left'
        },
        {
            name: 'invoiceId',
            label: 'Invoice ID',
            description: 'Invoice ID',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'grandTotal',
            label: 'Grand Total',
            description: 'Grand Total',
            type: 'number',
            style: 'right fixed'
        },
        {
            name: 'associate',
            label: 'Associate',
            description: 'Associate',
            type: 'string',
            style: 'left'
        },
        {
            name: 'result',
            label: 'Result',
            description: 'ID Scan Result',
            type: 'string',
            style: 'left'
        },
        {
            name: 'age',
            label: 'Age',
            description: 'Calculated Age',
            type: 'string',
            style: 'right fixed'
        },
        {
            name: 'state',
            label: 'State',
            description: 'ID Issuing State',
            type: 'string',
            style: 'right fixed'
        },
        {
            name: 'posBirthDate',
            label: 'POS Birth Date',
            description: 'POS Birth Date',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'scannedBirthDate',
            label: 'Scanned Birth Date',
            description: 'Scanned Birth Date',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'scannedName',
            label: 'Scanned Name',
            description: 'Scanned Name',
            type: 'string',
            style: 'left'
        },
        {
            name: 'posName',
            label: 'POS Guest Name',
            description: 'POS Guest Name',
            type: 'string',
            style: 'left'
        },
        {
            name: 'bypassReason',
            label: 'Bypass Reason',
            description: 'Bypass Reason',
            type: 'string',
            style: 'left'
        }
    ];
}
