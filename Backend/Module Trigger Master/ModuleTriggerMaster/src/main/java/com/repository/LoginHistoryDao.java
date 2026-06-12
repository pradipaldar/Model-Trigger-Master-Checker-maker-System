package com.repository;

import java.util.List;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.config.LoginHistoryRowMapper;
import com.model.LoginHistory;

@Repository
public class LoginHistoryDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private LoginHistoryRowMapper rowMapper;

    @Autowired
    private Properties props;

    public int saveLogin(
            int userId,
            String status) {

        String sql =
                props.getProperty(
                        "insertLoginHistory");

        return jdbcTemplate.update(
                sql,
                userId,
                status);
    }

    public int logout(int loginId) {

        String sql =
                props.getProperty("updateLogoutTime");

        return jdbcTemplate.update(
                sql,
                loginId);
    }

    public List<LoginHistory> getAllHistory() {

        String sql =
                props.getProperty(
                        "getAllLoginHistory");

        return jdbcTemplate.query(
                sql,
                rowMapper);
    }
    
    
}