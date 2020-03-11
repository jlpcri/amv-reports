export class Cogs {
    createdAt: string;
    updatedAt: string;
    packDate: string;
    shipDate: string;
    sku: string;
    orderType: string;
    quantity: number;
    price: number;
    priceEach: number;
    balance?: number;

    get stockDate(): string {
        if (this.packDate)
            return this.packDate;
        if (this.shipDate)
            return this.shipDate;
        return this.createdAt;
    }
}
