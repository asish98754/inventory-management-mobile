import prisma from "../config/prisma.js";

class DashboardRepository {
  async getStatistics() {
    const products = await prisma.product.findMany();

    const totalProducts = products.length;

    const outOfStock = products.filter(
      (product) => product.quantity === 0
    ).length;

    const lowStock = products.filter(
      (product) =>
        product.quantity > 0 &&
        product.quantity <= product.alertThreshold
    ).length;

    const categoryMap = new Map<string, number>();

    products.forEach((product) => {
      categoryMap.set(
        product.category,
        (categoryMap.get(product.category) || 0) + 1
      );
    });

    const categories = Array.from(categoryMap).map(
      ([category, count]) => ({
        category,
        count,
      })
    );

    return {
      totalProducts,
      outOfStock,
      lowStock,
      normalStock: totalProducts - outOfStock - lowStock,
      categories,
    };
  }
}

export default new DashboardRepository();
