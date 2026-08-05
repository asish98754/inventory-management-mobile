export interface CategoryStatistics {
  category: string;
  count: number;
}

export interface DashboardStatistics {
  totalProducts: number;
  outOfStock: number;
  lowStock: number;
  normalStock: number;

  categories: CategoryStatistics[];
}
