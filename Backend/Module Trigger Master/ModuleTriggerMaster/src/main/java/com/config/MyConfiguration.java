package com.config;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
@ComponentScan(basePackages = "com")
@PropertySource("classpath:application.properties")
public class MyConfiguration {

    @Autowired
    private Environment env;

    private Properties props = new Properties();
    private String jarBasePath;

    @PostConstruct
    public void loadExternalProperties() {
        try {
            String appPath = env.getProperty("external.app");
            String queryPath = env.getProperty("external.query");

            jarBasePath = env.getProperty("jar.base.path");

            try (InputStream fis1 = new FileInputStream(appPath);
                 InputStream fis2 = new FileInputStream(queryPath)) {

                props.load(fis1);
                props.load(fis2);
            }

            System.out.println("Properties Loaded");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getJarBasePath() {
        return jarBasePath;
    }

    @Bean
    public Properties props() {
        return props;
    }

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource ds = new DriverManagerDataSource();

        ds.setDriverClassName(props.getProperty("db.driver"));
        ds.setUrl(props.getProperty("db.url"));
        ds.setUsername(props.getProperty("db.username"));
        ds.setPassword(props.getProperty("db.password"));

        return ds;
    }

    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource());
    }
}