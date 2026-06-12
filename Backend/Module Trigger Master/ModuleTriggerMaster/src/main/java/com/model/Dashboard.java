package com.model;

public class Dashboard {

    private int totalModules;
    private int runningModules;
    private int pendingApprovals;
    private int approvedRequests;
    private int rejectedRequests;

    public int getTotalModules() {
        return totalModules;
    }

    public void setTotalModules(int totalModules) {
        this.totalModules = totalModules;
    }

    public int getRunningModules() {
        return runningModules;
    }

    public void setRunningModules(int runningModules) {
        this.runningModules = runningModules;
    }

    public int getPendingApprovals() {
        return pendingApprovals;
    }

    public void setPendingApprovals(int pendingApprovals) {
        this.pendingApprovals = pendingApprovals;
    }

    public int getApprovedRequests() {
        return approvedRequests;
    }

    public void setApprovedRequests(int approvedRequests) {
        this.approvedRequests = approvedRequests;
    }

    public int getRejectedRequests() {
        return rejectedRequests;
    }

    public void setRejectedRequests(int rejectedRequests) {
        this.rejectedRequests = rejectedRequests;
    }
}