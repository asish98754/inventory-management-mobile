import productRepository from "../repositories/product.repository.js";
import type {
  CreateProductDTO,
  UpdateProductDTO,
} from "../validations/product.validation.js";

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

  async updateProduct(id: string, data: UpdateProductDTO) {
    const existingProduct = await productRepository.findById(id);

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    const productWithReference = await productRepository.findByReference(
      data.reference
    );

    if (
      productWithReference &&
      productWithReference.id !== id
    ) {
      throw new Error("Reference already exists");
    }

    return productRepository.update(id, data);
  }
}

export default new ProductService();
