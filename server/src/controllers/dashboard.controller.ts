import type { Request, Response } from "express";
import dashboardService from "../services/dashboard.service.js";

class DashboardController {
  async getStatistics(req: Request, res: Response) {
    try {
      const statistics = await dashboardService.getStatistics();

      return res.status(200).json({
        success: true,
        data: statistics,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}

export default new DashboardController();
