export interface StockHistory {
    sourceId?: string;
    itemId?: string;
    createdAt?: string;
    updatedAt?: string;
    transaction?: string;
    transactionType?: string;
    transactionStatus?: string;
    productSku?: string;
    productName?: string;
    groupName?: string;
    manufacturer?: string;
    quantity?: number;
    priceEach?: number;
    employee?: string;
    quantityOnHand?: number;
    eventDate?: string;
    eventCost?: number;
    eventCostEach?: number;
    finaleCostEach?: number;
    finaleInvCost?: number;
}
