package com.amvholdings.reports.component.invoice;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import static com.amvholdings.reports.component.shared.DbUtil.closeAll;

@Component
@RequiredArgsConstructor
@Slf4j
public class InvoiceDomain {

    private final DataSource dataSource;

    final String sql =
            "SELECT o.id,ss.name,o.source_id," +
                    "o.invoice_id," +
                    "o.payment_date," +
                    "o.created_at," +
                    "o.updated_at," +
                    "o.total_paid," +
                    "o.grand_total, " +
                    "o.shipping_amount, " +
                    "o.tax_amount, " +
                    "oa.address_type, " +
                    "oa.first_name, " +
                    "oa.last_name, " +
                    "oa.line1, " +
                    "oa.line2, " +
                    "oa.city, " +
                    "oa.region, " +
                    "oa.postal_code " +
            "FROM orders o " +
                    "JOIN source_system ss ON ss.id = o.source_system_id " +
                    "LEFT JOIN order_address oa ON oa.order_id = o.id " +
            "WHERE o.payment_date BETWEEN ? and ? " +
            "AND ss.channel = ? "
            ;

    private InvoiceModel getRow(ResultSet rs, InvoiceModel invoiceModel) throws SQLException {
        if (invoiceModel == null) {
            invoiceModel = new InvoiceModel();
        }
        int n = 0;
        invoiceModel.id = rs.getLong(++n);
        invoiceModel.sourceSystem = rs.getString(++n);
        invoiceModel.sourceId = rs.getString(++n);
        invoiceModel.invoiceId = rs.getString(++n);
        invoiceModel.paymentDate = rs.getString(++n);
        invoiceModel.createdAt = rs.getString(++n);
        invoiceModel.updatedAt = rs.getString(++n);
        invoiceModel.paymentAmount = rs.getBigDecimal(++n);
        invoiceModel.grandTotal = rs.getBigDecimal(++n);
        invoiceModel.shippingAmount = rs.getBigDecimal(++n);
        invoiceModel.taxAmount = rs.getBigDecimal(++n);
        String addressType = rs.getString(++n);
        InvoiceAddressModel invoiceAddress;
        if ("shipping".equals(addressType)) {
            invoiceAddress = invoiceModel.shippingAddress;
        } else if ("billing".equals(addressType)){
            invoiceAddress = invoiceModel.billingAddress;
        } else {
            return invoiceModel;
        }
        invoiceAddress.firstName = rs.getString(++n);
        invoiceAddress.lastName = rs.getString(++n);
        invoiceAddress.line1 = rs.getString(++n);
        invoiceAddress.line2 = rs.getString(++n);
        invoiceAddress.city = rs.getString(++n);
        invoiceAddress.state = rs.getString(++n);
        invoiceAddress.zipCode = rs.getString(++n);
        return invoiceModel;
    }

    List<InvoiceModel> getInvoices(String startDate, String stopDate, String channel) {
        Map<Long,InvoiceModel> invoices = new HashMap<>();
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        try {
            conn = dataSource.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, startDate);
            stmt.setString(2, stopDate);
            stmt.setString(3, channel);
            rs = stmt.executeQuery();
            while (rs.next()) {
                Long invoiceId = rs.getLong(1);
                InvoiceModel invoiceModel = invoices.get(invoiceId);
                invoices.put(invoiceId, getRow(rs, invoiceModel));
            }
        } catch (SQLException ex) {
            log.error(ex.getMessage(), ex);
        } finally {
            closeAll(conn, stmt, rs);
        }
        return new ArrayList<>(invoices.values());
    }

}
