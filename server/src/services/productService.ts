import type { ProductPayload } from "../repositories/productRepository.js";
import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findProductById,
  getDashboardStats,
  updateProduct,
  updateProductStock,
} from "../repositories/productRepository.js";

export async function getAllProductsService() {
  return findAllProducts();
}

export async function getProductByIdService(id: string) {
  return findProductById(id);
}

export async function createProductService(payload: ProductPayload) {
  return createProduct(payload);
}

export async function updateProductService(id: string, payload: ProductPayload) {
  return updateProduct(id, payload);
}

export async function updateStockService(id: string, quantityDelta: number) {
  return updateProductStock(id, quantityDelta);
}

export async function deleteProductService(id: string) {
  return deleteProduct(id);
}

export async function getDashboardStatsService() {
  return getDashboardStats();
}
