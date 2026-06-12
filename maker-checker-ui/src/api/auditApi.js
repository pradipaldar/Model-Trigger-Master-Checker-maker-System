import api from "./axiosConfig";

export const getAuditLogs =
  async () => {

    const response =
      await api.get(
        "/audit"
      );

    return response.data;
};