import {PageableTableColumn} from "../../../shared/pageable-table/shared/pageable-table-column.model";

export class AgeTransactionColumns {
    static COLUMNS: PageableTableColumn[] = [
        {
            name: 'paymentDate',
            label: 'Date',
            description: 'Date',
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
            name: 'idBirthDate',
            label: 'ID Birth Date',
            description: 'ID Birth Date',
            type: 'string',
            style: 'left'
        },
        {
            name: 'posBirthDate',
            label: 'POS Birth Date',
            description: 'Birth Date in Erply',
            type: 'string',
            style: 'right fixed'
        },
        {
            name: 'idGuestName',
            label: 'ID Guest Name',
            description: 'Given Name Field from the ID',
            type: 'string',
            style: 'left'
        },
        {
            name: 'posFirstName',
            label: 'POS First Name',
            description: 'POS First Name',
            type: 'string',
            style: 'left'
        },
        {
            name: 'posLastName',
            label: 'POS Last Name',
            description: 'POS Last Name',
            type: 'string',
            style: 'left'
        },
        {
            name: 'invoiceId',
            label: 'Invoice ID',
            description: 'Invoice ID',
            type: 'string',
            style: 'left'
        },
        {
            name: 'posAccount',
            label: 'POS Account',
            description: 'Account ID',
            type: 'string',
            style: 'left'
        }
    ];
}
