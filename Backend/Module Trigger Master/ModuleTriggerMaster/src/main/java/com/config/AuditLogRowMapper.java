package com.config;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.model.AuditLog;

@Component
public class AuditLogRowMapper implements RowMapper<AuditLog> {

    @Override
    public AuditLog mapRow(ResultSet rs, int rowNum)
            throws SQLException {

        AuditLog a = new AuditLog();

        a.setAuditId(rs.getInt("audit_id"));
        a.setUserId(rs.getInt("user_id"));
        a.setModuleId(rs.getInt("module_id"));
        a.setActionType(rs.getString("action_type"));
        a.setRemarks(rs.getString("remarks"));
        a.setActionTime(rs.getTimestamp("action_time"));

        return a;
    }
}