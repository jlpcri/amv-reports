import {AgeCategory} from "./age-category.model";

export class GuestAges {
    startDate: string;
    stopDate: string;
    totalTransactions: number;
    unknownCount: number;
    confirmedCount: number;
    scannedCount: number;
    histCount: number;
    posCount: number;
    ageCategories: AgeCategory[];
    all: AgeCategory;
    unknown: AgeCategory;
}
