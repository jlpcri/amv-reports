export class Cogs {
    createdAt: string;
    updatedAt: string;
    packDate: string;
    invoiceId: string;
    shipDate: string;
    sku: string;
    orderType: string;
    quantity: number;
    price: number;
    priceEach: number;
    balance?: number;
    cost: number;
    averageCost: number;
}

export class StockCost {
    quantity: number;
    cost: number;
}
