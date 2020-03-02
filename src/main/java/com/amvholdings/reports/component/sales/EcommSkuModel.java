package com.amvholdings.reports.component.sales;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class EcommSkuModel {
    String source;
    String sourceName;
    String sourceId;
    String invoiceId;
    String createdAt;
    String status;
    String sku;
    String productName;
    String shippingFirstName;
    String shippingLastName;
    String shippingStreet;
    String shippingRegion;
    String shippingZipCode;
    BigDecimal quantity;
    BigDecimal price;
}
