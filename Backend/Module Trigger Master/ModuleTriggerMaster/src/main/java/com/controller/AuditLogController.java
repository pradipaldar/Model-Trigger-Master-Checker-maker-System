package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.model.AuditLog;
import com.service.AuditLogService;

@RestController
@RequestMapping("/api/audit")
@CrossOrigin(origins = "*")
public class AuditLogController {

    @Autowired
    private AuditLogService service;

    @GetMapping
    public List<AuditLog> getAllLogs() {
        return service.getAllLogs();
    }
}