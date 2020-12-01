import {PageableTableColumn} from '../../../shared/pageable-table/shared/pageable-table-column.model';

export class RetailGuestColumns {
    static COLUMNS: PageableTableColumn[] = [
        {
            name: 'sourceId',
            label: 'Erply ID',
            description: 'Erply ID',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'firstName',
            label: 'First',
            description: 'First Name',
            type: 'string',
            style: 'left'
        },
        {
            name: 'lastName',
            label: 'Last',
            description: 'Last Name',
            type: 'string',
            style: 'left'
        },
        {
            name: 'phone',
            label: 'Phone',
            description: 'Phone',
            type: 'string',
            style: 'left'
        },
        {
            name: 'email',
            label: 'Email',
            description: 'Email',
            type: 'string',
            style: 'left'
        },
        {
            name: 'firstVisitDate',
            label: 'First Visit',
            description: 'First Visit',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'firstVisitLocation',
            label: 'First Location',
            description: 'First Location',
            type: 'string',
            style: 'left'
        },
        {
            name: 'lastVisitDate',
            label: 'Last Visit',
            description: 'Last Visit',
            type: 'string',
            style: 'left fixed'
        },
        {
            name: 'lastVisitLocation',
            label: 'Last Location',
            description: 'Last Location',
            type: 'string',
            style: 'left'
        },
    ];
}
