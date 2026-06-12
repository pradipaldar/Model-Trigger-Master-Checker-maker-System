package com.model;

import java.time.LocalDate;
import java.time.LocalTime;

public class Module_Trigger_Master {

    private int id;
    private String model_name;
    private String jar_name;
    private LocalDate holiday_date;
    private LocalTime start_time;
    private LocalTime end_time;
    private String service_status;
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getModel_name() {
		return model_name;
	}
	public void setModel_name(String model_name) {
		this.model_name = model_name;
	}
	public String getJar_name() {
		return jar_name;
	}
	public void setJar_name(String jar_name) {
		this.jar_name = jar_name;
	}
	public LocalDate getHoliday_date() {
		return holiday_date;
	}
	public void setHoliday_date(LocalDate holiday_date) {
		this.holiday_date = holiday_date;
	}
	public LocalTime getStart_time() {
		return start_time;
	}
	public void setStart_time(LocalTime start_time) {
		this.start_time = start_time;
	}
	public LocalTime getEnd_time() {
		return end_time;
	}
	public void setEnd_time(LocalTime end_time) {
		this.end_time = end_time;
	}
	public String getService_status() {
		return service_status;
	}
	public void setService_status(String service_status) {
		this.service_status = service_status;
	}
	@Override
	public String toString() {
		return "Module_Trigger_Master [id=" + id + ", model_name=" + model_name + ", jar_name=" + jar_name
				+ ", holiday_date=" + holiday_date + ", start_time=" + start_time + ", end_time=" + end_time
				+ ", service_status=" + service_status + "]";
	}
	
	
}