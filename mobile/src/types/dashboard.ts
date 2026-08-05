export interface DashboardStatistics {
  totalProducts: number;
  outOfStock: number;
  lowStock: number;
  normalStock: number;

  categories: {
    category: string;
    count: number;
  }[];
}
