import {Timezone} from './types/timezone';
import * as moment from 'moment-timezone';

export class GlobalConstants {
    public static timezones: Timezone[] = [
        {
            id: 0,
            abbrev: moment.tz.guess(),
            name: 'Local Time'
        },
        {
            id: 1,
            abbrev: 'America/Los_Angeles',
            name: 'Pacific Time'
        },
        {
            id: 2,
            abbrev: 'America/Phoenix',
            name: 'Mountain Time'
        },
        {
            id: 3,
            abbrev: 'America/Chicago',
            name: 'Central Time'
        },
        {
            id: 4,
            abbrev: 'America/New_York',
            name: 'Eastern Time'
        }
    ];
}
