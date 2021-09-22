import {Address} from './address';

export interface Invoice {
    id: number;
    sourceSystem?: string;
    sourceId?: string;
    invoiceId: string;
    paymentDate?: string;
    createdAt?: string;
    updatedAt?: string;
    paymentAmount?: number;
    paymentMethod?: string;
    grandTotal?: number;
    shippingAmount?: number;
    taxAmount?: number;
    exciseTaxAmount?: number;
    refundAmount?: number;
    creditAmount?: number;
    discountAmount?: number;
    couponCode?: string;
    subtotal?: number;
    netPrice?: number;
    status?: string;
    customerGroup?: string;
    customerNote?: string;
    register?: string;
    location?: string;
    employee?: string;
    customerId?: number;
    shippingAddress?: Address;
    billingAddress?: Address;
    customerAddresses?: Address[];
}
