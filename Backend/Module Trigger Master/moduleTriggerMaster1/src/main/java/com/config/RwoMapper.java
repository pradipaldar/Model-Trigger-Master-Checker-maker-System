package com.config;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.model.Students;

@Component
public class RwoMapper implements RowMapper<Students> {

	@Override
	public Students mapRow(ResultSet rs, int rowNum) throws SQLException {
		Students s = new Students();
		s.setName(rs.getString("name"));
		s.setDivision(rs.getString("division"));
		s.setCity(rs.getString("city"));
		s.setId(rs.getInt("id"));
		s.setPercentage(rs.getDouble("percentage"));

		return s;
	}
}
