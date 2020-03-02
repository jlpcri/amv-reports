package com.amvholdings.reports.component.sales;

import com.amvholdings.reports.component.shared.RangeQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class EcommSkuDomain {
    private final RangeQuery rangeQuery;


    final String sql = "" +
            "SELECT " +
            "ss.name as source, " +
            "ss.description as sourceName, " +
            "o.created_at as createdAt, " +
            "o.source_id as sourceId, " +
            "o.invoice_id as invoiceId, " +
            "o.status as status, " +
            "oi.sku as sku, " +
            "oi.product_name as productName, " +
            "oi.quantity_invoiced as quantity, " +
            "oi.price as price, " +
            "oa.first_name as shippingFirstName, " +
            "oa.last_name as shippingLastName, " +
            "oa.line1 as shippingStreet, " +
            "oa.region as shippingRegion, " +
            "oa.postal_code as shippingZipCode " +
            "FROM orders o, order_item oi, source_system ss, order_address oa " +
            "WHERE oi.order_id = o.id " +
            "AND o.source_system_id = ss.id " +
            "AND oa.order_id = o.id " +
            "AND oa.address_type = 'shipping' " +
            "AND o.created_at BETWEEN ? AND ? " +
            "AND ss.channel = 'ecomm'"
            ;

    List<EcommSkuModel> getEcommSkus(String startDate, String stopDate) {
        return rangeQuery.execute(startDate, stopDate, sql, new EcommSkuRowMapper());
    }
}
