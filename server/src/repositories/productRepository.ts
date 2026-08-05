import { type ProductCategory } from "@prisma/client";
import prisma from "../config/prisma.js";

export type ProductPayload = {
  name: string;
  reference: string;
  description: string;
  category: ProductCategory;
  quantity: number;
  alertThreshold: number;
  image?: string | null;
};

export async function findAllProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function findProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export async function createProduct(payload: ProductPayload) {
  return prisma.product.create({
    data: {
      name: payload.name,
      reference: payload.reference,
      description: payload.description,
      category: payload.category,
      quantity: payload.quantity,
      alertThreshold: payload.alertThreshold,
      image: payload.image ?? null,
    },
  });
}

export async function updateProduct(id: string, payload: ProductPayload) {
  return prisma.product.update({
    where: { id },
    data: {
      name: payload.name,
      reference: payload.reference,
      description: payload.description,
      category: payload.category,
      quantity: payload.quantity,
      alertThreshold: payload.alertThreshold,
      image: payload.image ?? null,
    },
  });
}

export async function updateProductStock(id: string, quantityDelta: number) {
  const currentItem = await prisma.product.findUnique({ where: { id } });

  if (!currentItem) {
    return null;
  }

  return prisma.product.update({
    where: { id },
    data: {
      quantity: currentItem.quantity + quantityDelta,
    },
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}

export async function getDashboardStats() {
  const [totalProducts, lowStockCount, totalQuantityResult, categoryBreakdown] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({
      where: {
        quantity: {
          lte: prisma.product.fields.alertThreshold ?? 0,
        },
      },
    }),
    prisma.product.aggregate({
      _sum: {
        quantity: true,
      },
    }),
    prisma.product.groupBy({
      by: ["category"],
      _sum: {
        quantity: true,
      },
    }),
  ]);

  return {
    totalProducts,
    lowStockCount,
    totalQuantity: totalQuantityResult._sum.quantity ?? 0,
    categorySummary: categoryBreakdown.map((item) => ({
      category: item.category,
      totalQuantity: item._sum.quantity ?? 0,
    })),
  };
}
