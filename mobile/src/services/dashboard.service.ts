import { api } from "./api";

export const DashboardService = {
  getStatistics() {
    return api.get("/dashboard");
  },
};
