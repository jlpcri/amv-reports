import {AgeCategory} from "./age-category.model";

export class GuestAges {
    startDate: string;
    stopDate: string;
    totalTransactions: number;
    unknowns: number;
    ageCategories: AgeCategory[];
    all: AgeCategory;
    unknown: AgeCategory;
}
