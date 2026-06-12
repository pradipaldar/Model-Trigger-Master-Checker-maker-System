package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.model.ModuleApproval;
import com.model.User;
import com.repository.ModuleApprovalDao;
import com.repository.Module_TriggerDao;
import com.repository.UserDao;

@Service
@Transactional
public class ApprovalService {

    @Autowired
    private ModuleApprovalDao approvalDao;

    @Autowired
    private Module_TriggerDao moduleDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private AuditLogService auditService;

    public int createRequest(ModuleApproval request) {

        int result = approvalDao.createRequest(request);

        auditService.saveLog(
                request.getNormalUserId(),
                request.getModuleId(),
                "REQUEST_CREATED",
                request.getRemarks());

        return result;
    }

    public List<ModuleApproval> getPendingRequests() {
        return approvalDao.getPendingRequests();
    }

    // =========================
    // APPROVE
    // =========================
    public String approveRequest(int approvalId, int checkerId, String checkerRemark) {

        if (checkerRemark == null) {
            checkerRemark = "";
        }

        User checker = userDao.getUserById(checkerId);
        if (checker == null) return "Invalid User";

        if (!"CHECKER".equalsIgnoreCase(checker.getRole())
                && !"ADMIN".equalsIgnoreCase(checker.getRole())) {
            return "Only Checker/Admin Can Approve";
        }

        ModuleApproval request = approvalDao.getById(approvalId);
        if (request == null) return "Request Not Found";

        if (request.getNormalUserId() == checkerId)
            return "Maker Cannot Approve Own Request";

        if (!"PENDING".equalsIgnoreCase(request.getApprovalStatus()))
            return "Request Already Processed";

        moduleDao.updateFromApproval(
                request.getModuleId(),
                request.getNewStartTime(),
                request.getNewEndTime(),
                request.getNewServiceStatus()
        );

        approvalDao.approveRequest(
                approvalId,
                checkerId,
                checkerRemark
        );

        auditService.saveLog(
                checkerId,
                request.getModuleId(),
                "REQUEST_APPROVED",
                checkerRemark
        );

        return "Approved Successfully";
    }

    // =========================
    // REJECT
    // =========================
    public String rejectRequest(int approvalId, int checkerId, String checkerRemark) {

        if (checkerRemark == null) {
            checkerRemark = "";
        }

        User checker = userDao.getUserById(checkerId);
        if (checker == null) return "Invalid User";

        if (!"CHECKER".equalsIgnoreCase(checker.getRole())
                && !"ADMIN".equalsIgnoreCase(checker.getRole())) {
            return "Only Checker/Admin Can Reject";
        }

        ModuleApproval request = approvalDao.getById(approvalId);
        if (request == null) return "Request Not Found";

        if (request.getNormalUserId() == checkerId)
            return "Maker Cannot Reject Own Request";

        if (!"PENDING".equalsIgnoreCase(request.getApprovalStatus()))
            return "Request Already Processed";

        approvalDao.rejectRequest(
                approvalId,
                checkerId,
                checkerRemark
        );

        auditService.saveLog(
                checkerId,
                request.getModuleId(),
                "REQUEST_REJECTED",
                checkerRemark
        );

        return "Rejected Successfully";
    }

    public List<ModuleApproval> getMakerRequests(int userId) {
        return approvalDao.getMakerRequests(userId);
    }
}