import productRepository from "../repositories/product.repository.js";
import type { CreateProductDTO } from "../validations/product.validation.js";

export class ProductService {
  async getAllProducts() {
    return productRepository.findAll();
  }

  async getProductById(id: string) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async createProduct(data: CreateProductDTO) {
    const existingProduct = await productRepository.findByReference(
      data.reference
    );

    if (existingProduct) {
      throw new Error("Reference already exists");
    }

    return productRepository.create(data);
  }
}

export default new ProductService();
