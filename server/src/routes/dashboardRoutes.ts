import { Router } from "express";
import { getDashboardStats } from "../controllers/productController.js";

const router = Router();

router.get("/dashboard", getDashboardStats);

export default router;
