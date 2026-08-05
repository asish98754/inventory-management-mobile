import prisma from "../config/prisma.js";

export class ProductRepository {
  async findAll() {
    return prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new ProductRepository();
