package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.model.ModuleApproval;
import com.service.ApprovalService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/approval")
public class ApprovalController {

    @Autowired
    private ApprovalService service;

    @PostMapping("/request")
    public String createRequest(@RequestBody ModuleApproval request) {
        service.createRequest(request);
        return "Request Submitted";
    }

    @GetMapping("/pending")
    public List<ModuleApproval> pending() {
        return service.getPendingRequests();
    }

    // =========================
    // APPROVE WITH REMARK
    // =========================
    @PutMapping("/{approvalId}/approve/{checkerId}")
    public String approve(
            @PathVariable int approvalId,
            @PathVariable int checkerId,
            @RequestBody String checkerRemark) {

        return service.approveRequest(
                approvalId,
                checkerId,
                checkerRemark);
    }

    // =========================
    // REJECT WITH REMARK
    // =========================
    @PutMapping("/{approvalId}/reject/{checkerId}")
    public String reject(
            @PathVariable int approvalId,
            @PathVariable int checkerId,
            @RequestBody String checkerRemark) {

        return service.rejectRequest(
                approvalId,
                checkerId,
                checkerRemark);
    }

    @GetMapping("/maker/{userId}")
    public List<ModuleApproval> getMakerRequests(
            @PathVariable int userId) {

        return service.getMakerRequests(userId);
    }
}