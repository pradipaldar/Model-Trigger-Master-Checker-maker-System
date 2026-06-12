package com.config;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.model.LoginHistory;

@Component
public class LoginHistoryRowMapper
        implements RowMapper<LoginHistory> {

    @Override
    public LoginHistory mapRow(
            ResultSet rs,
            int rowNum)
            throws SQLException {

        LoginHistory h =
                new LoginHistory();

        h.setLoginId(
                rs.getInt("login_id"));

        h.setUserId(
                rs.getInt("user_id"));

        h.setLoginTime(
                rs.getTimestamp("login_time"));

        h.setLogoutTime(
                rs.getTimestamp("logout_time"));

        h.setLoginStatus(
                rs.getString("login_status"));

        return h;
    }
}