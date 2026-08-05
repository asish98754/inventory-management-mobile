import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  updateStock,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.patch("/:id/stock", updateStock);
router.delete("/:id", deleteProduct);

export default router;
