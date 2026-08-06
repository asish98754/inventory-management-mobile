import { api } from "./api";
import { Product } from "../types/product";

export const ProductService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await api.get("/products");
    return response.data.data;
  },

  async getProduct(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
  },

  async createProduct(data: Partial<Product>) {
    return api.post("/products", data);
  },

  async updateProduct(id: string, data: Partial<Product>) {
    return api.put(`/products/${id}`, data);
  },

  async deleteProduct(id: string) {
    return api.delete(`/products/${id}`);
  },

  async updateStock(
    id: string,
    data: {
      type: "IN" | "OUT";
      quantity: number;
    }
  ) {
    return api.patch(`/products/${id}/stock`, data);
  },
};
