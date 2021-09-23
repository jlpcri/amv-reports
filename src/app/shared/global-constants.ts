import {Timezone} from './types/timezone';

export class GlobalConstants {
    public static timezones: Timezone[] = [
        {
            id: 0,
            abbrev: 'PT',
            value: 'America/Los_Angeles',
            description: 'Pacific Time'
        },
        {
            id: 1,
            abbrev: 'MT',
            value: 'America/Phoenix',
            description: 'Mountain Time'
        },
        {
            id: 2,
            abbrev: 'CT',
            value: 'America/Chicago',
            description: 'Central Time'
        },
        {
            id: 3,
            abbrev: 'ET',
            value: 'America/New_York',
            description: 'Eastern Time'
        }
    ];
}
