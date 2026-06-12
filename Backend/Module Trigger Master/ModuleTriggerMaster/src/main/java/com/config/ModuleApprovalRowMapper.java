package com.config;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.model.ModuleApproval;

@Component
public class ModuleApprovalRowMapper
        implements RowMapper<ModuleApproval> {

    @Override
    public ModuleApproval mapRow(
            ResultSet rs,
            int rowNum)
            throws SQLException {

        ModuleApproval m =
                new ModuleApproval();

        m.setApprovalId(
                rs.getInt("approval_id"));

        m.setModuleId(
                rs.getInt("module_id"));

        m.setNormalUserId(
                rs.getInt("normal_user_id"));

        m.setHigherAuthorityId(
                (Integer) rs.getObject(
                        "higher_authority_id"));

        m.setRemarks(
                rs.getString("remarks"));

        m.setApprovalStatus(
                rs.getString("approval_status"));

        m.setRequestDate(
                rs.getTimestamp("request_date"));

        m.setApprovalDate(
                rs.getTimestamp("approval_date"));

        if (rs.getTime("new_start_time") != null) {

            m.setNewStartTime(
                    rs.getTime("new_start_time")
                            .toLocalTime());
        }

        if (rs.getTime("new_end_time") != null) {

            m.setNewEndTime(
                    rs.getTime("new_end_time")
                            .toLocalTime());
        }

        m.setNewServiceStatus(
                rs.getString("new_service_status"));

        // ✅ Checker Remark
        m.setCheckerRemark(
                rs.getString("checker_remark"));

        return m;
    }
}