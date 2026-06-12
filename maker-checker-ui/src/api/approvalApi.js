import api from "./axiosConfig";

export const sendApprovalRequest = async (request) => {
  const response = await api.post("/approval/request", request);
  return response.data;
};

export const getPendingApprovals = async () => {
  const response = await api.get("/approval/pending");
  return response.data;
};

// ==========================
// APPROVE WITH REMARK
// ==========================
export const approveRequest = async (approvalId, checkerId, remark) => {
  const response = await api.put(
    `/approval/${approvalId}/approve/${checkerId}`,
    { checkerRemark: remark }
  );
  return response.data;
};

// ==========================
// REJECT WITH REMARK
// ==========================
export const rejectRequest = async (approvalId, checkerId, remark) => {
  const response = await api.put(
    `/approval/${approvalId}/reject/${checkerId}`,
    { checkerRemark: remark }
  );
  return response.data;
};

export const getMyRequests = async (userId) => {
  const response = await api.get(`/approval/maker/${userId}`);
  return response.data;
};
