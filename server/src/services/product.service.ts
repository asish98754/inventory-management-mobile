import productRepository from "../repositories/product.repository.js";

export class ProductService {
  async getAllProducts() {
    return productRepository.findAll();
  }
}

export default new ProductService();
