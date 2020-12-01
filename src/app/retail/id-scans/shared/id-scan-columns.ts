import {PageableTableColumn} from "../../../shared/pageable-table/shared/pageable-table-column.model";

export class IdScanColumns {
    static COLUMNS: PageableTableColumn[] = [
        {
            name: 'eventTimestamp',
            label: 'Timestamp',
            description: 'ID Scan Event Timestamp',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'register',
            label: 'Register',
            description: 'Register',
            type: 'string',
            style: 'left'
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
            description: 'Result',
            type: 'string',
            style: 'left'
        },
        {
            name: 'age',
            label: 'Age',
            description: 'Calculated Age',
            type: 'integer',
            style: 'right'
        },
        {
            name: 'state',
            label: 'State',
            description: 'State that issued the ID',
            type: 'string',
            style: 'right fixed'
        },
        {
            name: 'birthDate',
            label: 'Birth Date',
            description: 'Birth Date Field from the ID',
            type: 'string',
            style: 'right fixed'
        },
        {
            name: 'expiryDate',
            label: 'Expiry Date',
            description: 'Expiry Date Field from the ID',
            type: 'string',
            style: 'right fixed'
        },
        {
            name: 'guestName',
            label: 'Guest Name',
            description: 'Given Name Field from the ID',
            type: 'string',
            style: 'left'
        },
        {
            name: 'bypassReason',
            label: 'Bypass Reason',
            description: 'Selected Bypass Reason',
            type: 'string',
            style: 'left'
        }
    ];
}
