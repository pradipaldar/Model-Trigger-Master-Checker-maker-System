package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.model.Students;
@Repository
public class StudentDao {
	
	@Autowired
	private JdbcTemplate j;
	@Autowired
	private RowMapper r;
	@Autowired
	private Environment env ;
	
	
	public List<Students> getallData(){
		
		String sql = env.getProperty("getAllData");
		return j.query(sql, r);
	}
	
	

}
