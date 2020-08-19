import {AgeCategoryTransaction} from "./age-category-transaction.model";

export class AgeCategory {
    customerIds: number[];
    orderIds: number[];
    idGuests: string[];
    transactions: AgeCategoryTransaction[];
    startAge: number;
    stopAge: number;
    confirmedCount: number;
    scannedCount: number;
    histCount: number;
    posCount: number;
}
