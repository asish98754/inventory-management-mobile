import { Router } from "express";
import productRoutes from "./product.routes.js";
import dashboardRoutes from "./dashboard.routes.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
