package com.repository;

import java.util.List;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.config.AuditLogRowMapper;
import com.model.AuditLog;

@Repository
public class AuditLogDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private AuditLogRowMapper rowMapper;

    @Autowired
    private Properties props;

    public int save(AuditLog log) {

        String sql =
                props.getProperty("insertAuditLog");

        return jdbcTemplate.update(
                sql,
                log.getUserId(),
                log.getModuleId(),
                log.getActionType(),
                log.getRemarks());
    }

    public List<AuditLog> getAllLogs() {

        String sql =
                props.getProperty("getAllAuditLogs");

        return jdbcTemplate.query(sql, rowMapper);
    }
}