import dashboardRepository from "../repositories/dashboard.repository.js";

class DashboardService {
  async getStatistics() {
    return dashboardRepository.getStatistics();
  }
}

export default new DashboardService();
