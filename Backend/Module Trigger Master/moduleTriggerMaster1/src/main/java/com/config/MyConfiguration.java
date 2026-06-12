package com.config;

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
@PropertySource("file:D:/properties1/application.properties")
@PropertySource("file:D:/properties1/query.properties")

public class MyConfiguration {
	@Bean
	public JdbcTemplate j1() {
		JdbcTemplate j = new JdbcTemplate();
		j.setDataSource(datasource());
		return j;
	}
	
	
	@Autowired
	private Environment env;
	
	
	@Bean
	public DataSource datasource() {
		DriverManagerDataSource  ds = new DriverManagerDataSource();
		ds.setDriverClassName(env.getProperty("db.driver"));
		ds.setUrl(env.getProperty("db.url"));
		ds.setUsername(env.getProperty("db.username"));
		ds.setPassword(env.getProperty("db.password"));
         
         return ds;
	}
	

}
