package com.config;

import java.sql.*;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import com.model.Module_Trigger_Master;

@Component
public class ModuleRowMapper implements RowMapper<Module_Trigger_Master> {

	@Override
	public Module_Trigger_Master mapRow(ResultSet rs, int rowNum) throws SQLException {

		Module_Trigger_Master m = new Module_Trigger_Master();

		m.setId(rs.getInt("id"));
m.setModel_name(rs.getString("model_name"));
m.setJar_name(rs.getString("jar_name"));

m.setHoliday_date(rs.getDate("holiday_date").toLocalDate());

m.setStart_time(rs.getTime("start_time").toLocalTime());

m.setEnd_time(rs.getTime("end_time").toLocalTime());

		m.setService_status(rs.getString("service_status"));
		
		return m;
	}
}