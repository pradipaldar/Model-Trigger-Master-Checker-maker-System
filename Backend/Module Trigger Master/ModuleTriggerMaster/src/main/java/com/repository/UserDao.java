package com.repository;

import java.util.List;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.config.UserRowMapper;
import com.model.User;

@Repository
public class UserDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UserRowMapper rowMapper;

    @Autowired
    private Properties props;

    public User getUserByUsername(String username) {

        String sql = props.getProperty("getUserByUsername");

        List<User> list = jdbcTemplate.query(
                sql,
                rowMapper,
                username);

        if (list.isEmpty()) {
            return null;
        }

        return list.get(0);
    }
    
    public User getUserById(int userId) {

        String sql = props.getProperty("getUserById");

        List<User> list =
                jdbcTemplate.query(
                        sql,
                        rowMapper,
                        userId);

        if(list.isEmpty()) {
            return null;
        }

        return list.get(0);
    }
}