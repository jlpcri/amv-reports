export interface CustomerSku {
    customerSourceId: string;
    customerGroup: string;
    customerFirstName: string;
    customerLastName: string;
    customerCompany: string;
    sku: string;
    productName: string;
    quantityInvoiced: number;
    costTotal: number;
    salesTotal: number;
}
