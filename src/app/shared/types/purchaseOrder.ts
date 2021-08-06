export interface PurchaseOrder {
    invoiceId: string;
    storeName: string;
    sku: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalCost: number;
}
