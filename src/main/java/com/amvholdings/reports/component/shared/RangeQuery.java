package com.amvholdings.reports.component.shared;

import com.amvholdings.reports.component.invoice.InvoiceModel;
import com.amvholdings.reports.component.sales.EcommSkuModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.amvholdings.reports.component.shared.DbUtil.closeAll;

@Slf4j
@Component
@RequiredArgsConstructor
public class RangeQuery {

    private final DataSource dataSource;

    public <T> List<T> execute(String startDate, String stopDate, String sql, RowMapper<T> rowMapper) {
        List<T> objects = new ArrayList<>();
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        try {
            conn = dataSource.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, startDate);
            stmt.setString(2, stopDate);
            rs = stmt.executeQuery();
            while (rs.next()) {
                objects.add(rowMapper.map(rs));
            }
            return objects;
        } catch (SQLException ex) {
            log.error(ex.getMessage(), ex);
            return objects;
        } finally {
            closeAll(conn, stmt, rs);
        }
    }
}
