package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.model.LoginHistory;
import com.service.LoginHistoryService;

@RestController
@RequestMapping("/api/login-history")
@CrossOrigin(origins = "*")
public class LoginHistoryController {

    @Autowired
    private LoginHistoryService service;

    // Get all login history
    @GetMapping
    public List<LoginHistory> getAllHistory() {

        return service.getAllHistory();
    }

    // Logout API
    @PostMapping("/logout/{loginId}")
    public String logout(
            @PathVariable int loginId) {

        service.logout(loginId);

        return "Logout Successful";
    }
}