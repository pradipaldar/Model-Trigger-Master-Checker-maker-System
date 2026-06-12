package com.repository;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.model.Dashboard;

@Repository
public class DashboardDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private Properties props;

    public Dashboard getDashboard() {

        Dashboard d = new Dashboard();

        d.setTotalModules(
                jdbcTemplate.queryForObject(
                        props.getProperty("countModules"),
                        Integer.class));

        d.setRunningModules(
                jdbcTemplate.queryForObject(
                        props.getProperty("countRunningModules"),
                        Integer.class));

        d.setPendingApprovals(
                jdbcTemplate.queryForObject(
                        props.getProperty("countPendingApprovals"),
                        Integer.class));

        d.setApprovedRequests(
                jdbcTemplate.queryForObject(
                        props.getProperty("countApprovedRequests"),
                        Integer.class));

        d.setRejectedRequests(
                jdbcTemplate.queryForObject(
                        props.getProperty("countRejectedRequests"),
                        Integer.class));

        return d;
    }
}