import { Router } from "express";
import productController from "../controllers/product.controller.js";

const router = Router();

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProduct);

router.patch("/:id/stock", productController.updateProductStock);

router.delete("/:id", productController.deleteProduct);

export default router;
