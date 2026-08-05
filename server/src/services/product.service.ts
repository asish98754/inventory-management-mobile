import productRepository from "../repositories/product.repository.js";
import type {
  CreateProductDTO,
  UpdateProductDTO,
  UpdateStockDTO,
} from "../validations/product.validation.js";
import { StockMovementType } from "@prisma/client";

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

    return productRepository.create({
      ...data,
      image: data.image ?? null,
    });
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

    return productRepository.update(id, {
      ...data,
      image: data.image ?? null,
    });
  }

  async updateProductStock(
    id: string,
    data: UpdateStockDTO
  ) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    let newQuantity = product.quantity;

    if (data.type === "IN") {
      newQuantity += data.quantity;
    }

    if (data.type === "OUT") {
      if (product.quantity < data.quantity) {
        throw new Error("Insufficient stock");
      }

      newQuantity -= data.quantity;
    }

    await productRepository.updateStock(id, newQuantity);

    await productRepository.createStockMovement(
      id,
      data.type as StockMovementType,
      data.quantity
    );

    return productRepository.findById(id);
  }
  async deleteProduct(id: string) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    await productRepository.delete(id);

    return;
  }}

export default new ProductService();
