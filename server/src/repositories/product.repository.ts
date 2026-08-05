import { Prisma, StockMovementType } from "@prisma/client";
import prisma from "../config/prisma.js";

export class ProductRepository {
  async findAll() {
    return prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async findByReference(reference: string) {
    return prisma.product.findUnique({
      where: {
        reference,
      },
    });
  }

  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateStock(id: string, quantity: number) {
    return prisma.product.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });
  }

  async createStockMovement(
    productId: string,
    type: StockMovementType,
    quantity: number
  ) {
    return prisma.stockMovement.create({
      data: {
        productId,
        type,
        quantity,
      },
    });
  }
}

export default new ProductRepository();
