import { api } from "./api";
import { DashboardStatistics } from "../types/dashboard";

export const DashboardService = {
  async getStatistics(): Promise<DashboardStatistics> {
    const response = await api.get("/dashboard");

    return response.data.data;
  },
};
