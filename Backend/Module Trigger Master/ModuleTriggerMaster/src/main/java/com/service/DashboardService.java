package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Dashboard;
import com.repository.DashboardDao;

@Service
public class DashboardService {

    @Autowired
    private DashboardDao dao;

    public Dashboard getDashboard() {
        return dao.getDashboard();
    }
}