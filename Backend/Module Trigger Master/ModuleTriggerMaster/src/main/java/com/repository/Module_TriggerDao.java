package com.repository;

import java.util.List;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.config.ModuleRowMapper;
import com.model.Module_Trigger_Master;

@Repository
public class Module_TriggerDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ModuleRowMapper rowMapper;

    @Autowired
    private Properties props;
    //get all data code 
    public List<Module_Trigger_Master> getAllData() {
        String sql = props.getProperty("getAllData");
        return jdbcTemplate.query(sql, rowMapper);
    }
    //update model code
    
    public int updateModule(Module_Trigger_Master module) {

        String sql = props.getProperty("updateDatabase");

        return jdbcTemplate.update(
            sql,
            
            module.getStart_time(),
            module.getEnd_time(),
            module.getService_status(),
            module.getId()
        );
    }
    
    //insert model added model code 
    public int insertModule(Module_Trigger_Master module) {

        String sql = props.getProperty("insertModule");

        return jdbcTemplate.update(
            sql,
            module.getModel_name(),
            module.getJar_name(),
            module.getHoliday_date(),
            module.getStart_time(),
            module.getEnd_time(),
            module.getService_status()
        );
    }
    //jar sheduler can run only according to this 
    public List<Module_Trigger_Master> allData() {
        String sql = props.getProperty("allData");
        return jdbcTemplate.query(sql, rowMapper);
    }
    
    //new updateFromApproval
    
    public int updateFromApproval(
            int moduleId,
            java.time.LocalTime startTime,
            java.time.LocalTime endTime,
            String serviceStatus) {

        String sql =
                props.getProperty("updateModuleFromApproval");

        return jdbcTemplate.update(
                sql,
                startTime,
                endTime,
                serviceStatus,
                moduleId);
    }
}
