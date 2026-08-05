import { api } from "./api";

export const ProductService = {
  getAllProducts() {
    return api.get("/products");
  },

  getProduct(id: string) {
    return api.get(`/products/${id}`);
  },

  createProduct(data: any) {
    return api.post("/products", data);
  },

  updateProduct(id: string, data: any) {
    return api.put(`/products/${id}`, data);
  },

  deleteProduct(id: string) {
    return api.delete(`/products/${id}`);
  },

  updateStock(id: string, data: any) {
    return api.patch(`/products/${id}/stock`, data);
  },
};
