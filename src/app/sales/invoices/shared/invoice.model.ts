import {Address} from "./address.model";

export class Invoice {
    id: number;
    sourceSystem: string;
    sourceId: string;
    invoiceId: string;
    paymentDate: string;
    createdAt: string;
    updatedAt: string;
    paymentAmount: number;
    grandTotal: number;
    shippingAmount: number;
    taxAmount: number;
    register: string;
    customerId: number;
    shippingAddress: Address;
    billingAddress: Address;
    customerAddresses: Address[];
}
