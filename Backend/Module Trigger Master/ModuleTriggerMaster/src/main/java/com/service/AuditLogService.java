package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.AuditLog;
import com.repository.AuditLogDao;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogDao dao;

    public void saveLog(
            int userId,
            int moduleId,
            String actionType,
            String remarks) {

        AuditLog log = new AuditLog();

        log.setUserId(userId);
        log.setModuleId(moduleId);
        log.setActionType(actionType);
        log.setRemarks(remarks);

        dao.save(log);
    }

    public List<AuditLog> getAllLogs() {
        return dao.getAllLogs();
    }
}