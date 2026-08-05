import type { Request, Response } from "express";
import productService from "../services/product.service.js";
import {
  createProductSchema,
  updateProductSchema,
  updateStockSchema,
} from "../validations/product.validation.js";

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const product = await productService.getProductById(id);

      return res.status(200).json({
        success: true,
        data: product,
      });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const validatedData = createProductSchema.parse(req.body);

      const product = await productService.createProduct(validatedData);

      return res.status(201).json({
        success: true,
        message: "Product has beencreated successfully.",
        data: product,
      });

    } catch (error: any) {
      console.log(error);

      return res.status(500).json({
        success: false,
        error,
        message: error.message,
      });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validatedData = updateProductSchema.parse(req.body);

      const product = await productService.updateProduct(
        id,
        validatedData
      );

      return res.status(200).json({
        success: true,
        message: "Product has been updated successfully here.",
        data: product,
      });

    } catch (error: any) {
      console.log(error);

      return res.status(500).json({
        success: false,
        error,
        message: error.message,
      });
    }
  }

  async updateProductStock(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validatedData = updateStockSchema.parse(req.body);

      const product = await productService.updateProductStock(
        id,
        validatedData
      );

      return res.status(200).json({
        success: true,
        message: "Stock updated successfully",
        data: product,
      });

    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          errors: error.errors,
        });
      }

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await productService.deleteProduct(id);

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });

    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ProductController();
