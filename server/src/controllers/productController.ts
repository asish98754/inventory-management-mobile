import type { ProductCategory } from "@prisma/client";
import type { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getDashboardStatsService,
  getProductByIdService,
  updateProductService,
  updateStockService,
} from "../services/productService.js";

const isValidProductPayload = (payload: unknown): payload is {
  name: string;
  reference: string;
  description: string;
  category: ProductCategory;
  quantity: number;
  alertThreshold: number;
  image?: string | null;
} => {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const body = payload as Record<string, unknown>;

  return (
    typeof body.name === "string" &&
    typeof body.reference === "string" &&
    typeof body.description === "string" &&
    typeof body.category === "string" &&
    typeof body.quantity === "number" &&
    typeof body.alertThreshold === "number"
  );
};

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = typeof req.params.id === "string" ? req.params.id : "";
    const product = await getProductByIdService(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch product", error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (!isValidProductPayload(req.body)) {
      return res.status(400).json({ message: "Invalid product payload" });
    }

    const product = await createProductService(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product", error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    if (!isValidProductPayload(req.body)) {
      return res.status(400).json({ message: "Invalid product payload" });
    }

    const productId = typeof req.params.id === "string" ? req.params.id : "";
    const product = await updateProductService(productId, req.body);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update product", error });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const amount = Number(req.body?.quantity);

    if (!Number.isFinite(amount)) {
      return res.status(400).json({ message: "Quantity adjustment must be a number" });
    }

    const productId = typeof req.params.id === "string" ? req.params.id : "";
    const product = await updateStockService(productId, amount);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update stock", error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = typeof req.params.id === "string" ? req.params.id : "";
    const product = await deleteProductService(productId);
    return res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};

export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const stats = await getDashboardStatsService();
    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch dashboard stats", error });
  }
};
