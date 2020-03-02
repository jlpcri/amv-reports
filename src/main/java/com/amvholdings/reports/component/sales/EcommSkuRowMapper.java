package com.amvholdings.reports.component.sales;

import com.amvholdings.reports.component.shared.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class EcommSkuRowMapper implements RowMapper<EcommSkuModel> {
    @Override
    public EcommSkuModel map(ResultSet rs) throws SQLException {
        EcommSkuModel model = new EcommSkuModel();
        model.source = rs.getString("source");
        model.sourceName = rs.getString("sourceName");
        model.createdAt = rs.getString("createdAt");
        model.sourceId = rs.getString("sourceId");
        model.invoiceId = rs.getString("invoiceId");
        model.status = rs.getString("status");
        model.sku = rs.getString("sku");
        model.productName = rs.getString("productName");
        model.quantity = rs.getBigDecimal("quantity");
        model.price = rs.getBigDecimal("price");
        model.shippingFirstName = rs.getString("shippingFirstName");
        model.shippingLastName = rs.getString("shippingLastName");
        model.shippingStreet = rs.getString("shippingStreet");
        model.shippingRegion = rs.getString("shippingRegion");
        model.shippingZipCode = rs.getString("shippingZipCode");
        return model;
    };
}
