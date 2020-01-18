package com.amvholdings.reports.component.invoice;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class InvoiceModel {
    Long id;
    String sourceSystem;
    String sourceId;
    String invoiceId;
    String paymentDate;
    String createdAt;
    String updatedAt;
    BigDecimal paymentAmount;
    BigDecimal grandTotal;
    BigDecimal shippingAmount;
    BigDecimal taxAmount;
    InvoiceAddressModel shippingAddress = new InvoiceAddressModel();
    InvoiceAddressModel billingAddress = new InvoiceAddressModel();
}
